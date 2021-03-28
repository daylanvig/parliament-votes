import { Component } from 'react';
import BallotVote from '../models/BallotVote';

type VoteListProps = {
  ballotVotes: BallotVote[];
}

export default class VoteList extends Component<VoteListProps, {}> {

  private renderBallotVoteItem(ballotVote: BallotVote): JSX.Element {
    return (
      <dd key={ballotVote.getVoteURL()}>
        <a target="_blank" rel="noreferrer" href={ballotVote.getHyperLinkToParliamentVote()}>{ballotVote.getBillName()}</a>
        <span>{ballotVote.getVoted()}</span>
      </dd>
    )
  }
  render() {
    return (
      <dl>
        <dt>Votes</dt>
        {
          this.props.ballotVotes.map(bv => this.renderBallotVoteItem(bv))
        }
      </dl>
    )
  }
}
