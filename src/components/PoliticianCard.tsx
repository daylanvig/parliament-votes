import { Component, Fragment } from 'react';
import ParliamentAPI from 'api/ParliamentAPI';
import Politician from 'models/Politician';
import BallotVote from 'models/BallotVote';
import VoteList from './VoteList';
import ProfilePhoto from './ProfilePhoto';
import PoliticianSelect from './PoliticianSelect';
import './PoliticianCard.css';

type PoliticianCardProps = {
  politicians: Politician[];
  onPoliticianChanged(politician?: Politician): void;
};

type PoliticianCardState = {
  selectedPolitican?: Politician;
  selectedPoliticianBallotVotes: BallotVote[];
};

export default class PoliticianCard extends Component<PoliticianCardProps, PoliticianCardState> {

  /**
   * ctor
   * @param props 
   */
  constructor(props: PoliticianCardProps) {
    super(props);
    this.handlePoliticianSelectChanged = this.handlePoliticianSelectChanged.bind(this);
    this.state = {
      selectedPolitican: undefined,
      selectedPoliticianBallotVotes: []
    };
  }

  /**
   * Callback to handle select element being changed
   * @param selectedPolitician 
   */
  async handlePoliticianSelectChanged(selectedPolitician?: Politician) {
    let ballotVotes: BallotVote[];
    if (selectedPolitician != null) {
      ballotVotes = await ParliamentAPI.loadBallotVotesByPoliticianAsync(selectedPolitician);
    } else {
      ballotVotes = [];
    }
    this.props.onPoliticianChanged(selectedPolitician);
    this.setState({
      selectedPolitican: selectedPolitician,
      selectedPoliticianBallotVotes: ballotVotes
    });
  }

  renderDetails(): JSX.Element {
    const politician = this.state.selectedPolitican;

    if (politician == null) {
      return <Fragment></Fragment>;
    }

    return (
      <div>
        <div>
          <label>Party</label>
          <span>{politician.getPartyName()}</span>
        </div>
        <div>
          <label>Riding</label>
          <span>{politician.getRiding()}</span>
        </div>
        <VoteList ballotVotes={this.state.selectedPoliticianBallotVotes}></VoteList>
      </div>
    );
  }

  render(): JSX.Element {
    return (
      <div className="PoliticianCard">
        <ProfilePhoto
          politician={this.state.selectedPolitican}></ProfilePhoto>
        <PoliticianSelect politicians={this.props.politicians} onChange={this.handlePoliticianSelectChanged}></PoliticianSelect>
        {this.renderDetails()}
      </div>
    );
  }
}


