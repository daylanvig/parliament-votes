import axios from 'axios';
import {
  ParliamentAPIData,
  ParliamentPolitician,
  ParliamentBallotVote,
  ParliamentBill,
  ParliamentVote
} from 'api/ParliamentTypes';
import Politician from 'models/Politician';
import BallotVote from 'models/BallotVote';


// TODO : deal with caching etc to prevent duplicate loads (check redux/react query etc)

export default class ParliamentAPI {

  private static readonly _api = axios.create({
    baseURL: 'https://api.openparliament.ca'
  });

  // For now, caching these here in memory. In Future move
  private static _bills: ParliamentBill[];
  private static _politicians: ParliamentPolitician[];
  private static _votes: ParliamentVote[];

  public static async preCacheAsync(): Promise<void> {
    await Promise.all([this.loadAllBillsAsync(), this.loadPoliticiansAsync(), this.loadAllVotesAsync()]);
  }

  /**
   * Load the next page of data from the api
   * @param currentData 
   */
  private static async loadNextPageAsync<T>(currentData: ParliamentAPIData<T>): Promise<ParliamentAPIData<T> | undefined> {
    if (currentData.pagination.next_url == null) {
      return;
    }
    const results = await this._api.get(currentData.pagination.next_url);
    return results.data as ParliamentAPIData<T>;
  }
  // TODO: this is just being used to test. In future will not load all items
  /**
   * Iteratively load all pages of data
   * @param initialURL 
   */
  private static async loadAllPagesAsync<T>(initialURL: string): Promise<T[]> {
    const cachedItems = localStorage.getItem(initialURL);
    let allItems: T[];
    if (cachedItems == null) {
      allItems = [];
      const results = await this._api.get(initialURL);
      let items: ParliamentAPIData<T> | undefined = results.data as ParliamentAPIData<T>;
      while (items != null) {
        allItems.push(...items.objects);
        items = await this.loadNextPageAsync(items);
      }
      localStorage.setItem(initialURL, JSON.stringify(allItems));
    } else {
      allItems = JSON.parse(cachedItems);
    }
    return allItems;
  }

  /**
   * Load all bills from current session from parliament api
   */
  private static async loadAllBillsAsync(): Promise<ParliamentBill[]> {
    if (this._bills == null) {
      this._bills = await this.loadAllPagesAsync('/bills/?limit=500');
    }
    return this._bills;
  }

  /**
 * Load all bills from current session from parliament api
 */
  private static async loadAllVotesAsync(): Promise<ParliamentVote[]> {
    if (this._votes == null) {
      this._votes = await this.loadAllPagesAsync('/votes/?limit=500');
    }
    return this._votes;
  }

  private static async loadAllPoliticiansAsync(): Promise<ParliamentPolitician[]> {
    if (this._politicians == null) {
      this._politicians = await this.loadAllPagesAsync('/politicians/?limit=500');
    }
    return this._politicians;
  }

  /**
   * Load all politicians
   */
  public static async loadPoliticiansAsync(): Promise<Politician[]> {
    const politicians = await this.loadAllPoliticiansAsync();
    return politicians.map(p => new Politician(p));
  }

  public static async loadPoliticianDataByFullNameAsync(politicianName: string): Promise<Politician> {
    const politicians = await this.loadAllPoliticiansAsync();
    const politician = politicians.find(p => p.name === politicianName);
    if (politician == null) {
      throw new Error(`Invalid politician name - ${politicianName}`);
    }
    return new Politician(politician);
  }


  public static async loadBallotVotesByPoliticianAsync(politician: Politician): Promise<BallotVote[]> {
    const results = await this._api.get(`/votes/ballots/?politician=${politician.getURL()}`);
    const ballotVoteData = results.data as ParliamentAPIData<ParliamentBallotVote>;
    // these two (votes/bills) are cached in memory
    const votes = await this.loadAllVotesAsync();
    const bills = await this.loadAllBillsAsync();
    return ballotVoteData.objects.map(bv => {
      const vote = votes.find(v => v.url === bv.vote_url);
      if (vote == null) {
        throw new Error(`Vote not found - ${bv.vote_url}`);
      }
      return new BallotVote(bv, vote, bills.find(v => v.url === vote.bill_url));
    });
  }

  public static async getVoteHistoryAsync(politicianName: string): Promise<BallotVote[]> {
    const politician = await this.loadPoliticianDataByFullNameAsync(politicianName);
    return this.loadBallotVotesByPoliticianAsync(politician);
  }
}