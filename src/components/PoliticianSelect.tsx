import React from 'react';
import Politician from '../models/Politician';

type PoliticianSelectProps = {
  onChange(selectedPolitician?: Politician): void;
  politicians: Politician[];
};

type PoliticianSelectState = {
  selectedValue?: string;
};

export default class PoliticianSelect extends React.Component<PoliticianSelectProps, PoliticianSelectState> {

  /**
   * ctor
   * @param props 
   */
  constructor(props: PoliticianSelectProps) {
    super(props);
    this.state = {
      selectedValue: undefined
    };
  }

  private handleChange(selectedPoliticianURL?: string) {
    this.props.onChange(this.props.politicians.find(p => p.getURL() === selectedPoliticianURL));
    this.setState({ selectedValue: selectedPoliticianURL });
  }

  render() {
    return (
      <div className="select">
        <select value={this.state.selectedValue} onChange={e => this.handleChange(e.target.value)}>
          <option></option>
          {
            this.props.politicians.map(politician => {
              return <option key={politician.getURL()} value={politician.getURL()}>{politician.getFullName()}</option>;
            })
          }
        </select>
      </div>
    );
  }
}