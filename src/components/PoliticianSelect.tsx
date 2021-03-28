import React from 'react';
import Politician from 'models/Politician';
import Select from 'components/elements/Select';

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
    this.handleChange = this.handleChange.bind(this);
  }

  private handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedPoliticianURL = e.target.value;
    this.props.onChange(this.props.politicians.find(p => p.getURL() === selectedPoliticianURL));
    this.setState({ selectedValue: selectedPoliticianURL });
  }

  render() {
    const selectItems = this.props.politicians.map(p => ({ value: p.getURL(), label: p.getFullName() }));
    return (
      <Select items={selectItems} onChange={this.handleChange} selectedValue={this.state.selectedValue}></Select>
    );
  }
}