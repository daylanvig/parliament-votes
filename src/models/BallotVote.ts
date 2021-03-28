import ParliamentAPIUtils from 'api/ParliamentAPIUtils';
import { ParliamentBallotVote, ParliamentBill, ParliamentVote } from 'api/ParliamentTypes';


export default class BallotVote {
  private readonly _parliamentBallotVote: ParliamentBallotVote;
  private readonly _parliamentVote: ParliamentVote;
  private readonly _parliamentBill?: ParliamentBill;
  /**
   * ctor
   */
  constructor(parliamentBallotVote: ParliamentBallotVote, parliamentVote: ParliamentVote, parliamentBill?: ParliamentBill) {
    this._parliamentBallotVote = parliamentBallotVote;
    this._parliamentVote = parliamentVote;
    this._parliamentBill = parliamentBill;
  }

  public getVoteURL(): string {
    return this._parliamentBallotVote.vote_url;
  }

  /**
   * Get how this ballot voted.
   * Possible values are 'Yes', 'No', 'Paired', and 'Didn't Vote'
   */
  public getVoted(): string {
    return this._parliamentBallotVote.ballot;
  }

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