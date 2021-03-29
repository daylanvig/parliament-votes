import ParliamentAPIUtils from 'api/ParliamentAPIUtils';
import { ParliamentBallotVote, ParliamentBill, ParliamentVote } from 'api/ParliamentTypes';


/**
 * A ballot vote is a single vote completed by one individual.
 */
export default class BallotVote {
  private readonly _parliamentBallotVote: ParliamentBallotVote;
  private readonly _parliamentVote: ParliamentVote;
  private readonly _parliamentBill?: ParliamentBill;
  /**
   * ctor
   * @param parliamentBallotVote This is the MPs individual vote
   * @param parliamentVote This is the overall vote
   * @param parliamentBill The bill being voted on, if applicable. Certain budget measures don't have a bill, in which case this value will be undefined.
   */
  constructor(parliamentBallotVote: ParliamentBallotVote, parliamentVote: ParliamentVote, parliamentBill?: ParliamentBill) {
    this._parliamentBallotVote = parliamentBallotVote;
    this._parliamentVote = parliamentVote;
    this._parliamentBill = parliamentBill;
  }

  /**
   * Get the vote URL
   * @returns The url to reference the vote
   */
  public getVoteURL(): string {
    return this._parliamentBallotVote.vote_url;
  }

  /**
   * Get bill number
   * @returns The legislative number of the bill
   */
  public getBillNumber(): number {
    return this._parliamentVote.number;
  }
  /**
   * Check the passed status of the bill
   * @returns True if the measure being voted on has passed
   */
  public getPassed(): boolean {
    return this._parliamentVote.result === 'Passed';
  }

  /**
   * Get how this ballot voted.
   * Possible values are 'Yes', 'No', 'Paired', and 'Didn't Vote'
   */
  public getVoted(): string {
    return this._parliamentBallotVote.ballot;
  }

  /**
   * 
   * @returns A fully formatted url (https:..) that links the the openparliament page for this vote
   */
  public getHyperLinkToParliamentVote(): string {
    return ParliamentAPIUtils.getViewURL(this._parliamentBallotVote.vote_url);
  }

  /**
   * Get the name of the bill
   */
  public getBillName(): string {
    return this._parliamentBill?.name.en || this._parliamentVote.description.en;
  }
}