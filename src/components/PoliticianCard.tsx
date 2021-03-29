import { Component, Fragment } from 'react';
import Politician from 'models/Politician';
import ProfilePhoto from './ProfilePhoto';
import PoliticianSelect from './PoliticianSelect';
import './PoliticianCard.scss';

type PoliticianCardProps = {
  politicians: Politician[];
  onPoliticianChanged(politician?: Politician): void;
};

type PoliticianCardState = {
  selectedPolitican?: Politician;
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
    };
  }

  /**
   * Callback to handle select element being changed
   * @param selectedPolitician 
   */
  async handlePoliticianSelectChanged(selectedPolitician?: Politician) {
    this.props.onPoliticianChanged(selectedPolitician);
    this.setState({
      selectedPolitican: selectedPolitician,
    });
  }

  renderDetails(): JSX.Element {
    const politician = this.state.selectedPolitican;

    if (politician == null) {
      return <Fragment></Fragment>;
    }

    return (
      <div className='w-full mt-2 text-gray-700 grid grid-cols-6 gap-2'>
        <div>
          <label className='label'>Party</label>
          <span className='col-span-4'>{politician.getPartyName()}</span>
        </div>
        <div>
          <label className='label'>Riding</label>
          <span className='col-span-4'>{politician.getRiding()}</span>
        </div>
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


