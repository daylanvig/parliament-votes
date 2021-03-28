import React from 'react';
import ParliamentAPI from 'api/ParliamentAPI';
import LoadingIcon from 'components/elements/LoadingIcon';
import PoliticianCard from 'components/PoliticianCard';
import Politician from 'models/Politician';

type ComparePageState = {
  isLoading: boolean;
  selectedPoliticianOne?: Politician;
  selectedPoliticianTwo?: Politician;
  politicians: Politician[];
};

export default class ComparePage extends React.Component<{}, ComparePageState> {

  /**
   * Ctor
   * @param props 
   */
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoading: true,
      selectedPoliticianOne: undefined,
      selectedPoliticianTwo: undefined,
      politicians: []
    };
  }

  /**
   * On mount precache. This is for dev purposes (future can lazy load)
   */
  async componentDidMount() {
    await ParliamentAPI.preCacheAsync();
    const politicians = await ParliamentAPI.loadPoliticiansAsync();
    this.setState({
      isLoading: false,
      politicians: politicians.sort((a, b) => a.getFullName().localeCompare(b.getFullName()))
    });
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIcon colour="info" size="is-large"></LoadingIcon>;
    }
    return (
      <section className="section">
        <div className="container columns">
          {
            // The politcians here are filtered so people can not compare them against themselves
          }
          <div className="column">
            <PoliticianCard
              politicians={this.state.politicians.filter(p => p !== this.state.selectedPoliticianTwo)}
              onPoliticianChanged={politician => this.setState({ selectedPoliticianOne: politician })}
            ></PoliticianCard>
          </div>
          <div className="column">
            <PoliticianCard
              politicians={this.state.politicians.filter(p => p !== this.state.selectedPoliticianOne)}
              onPoliticianChanged={politician => this.setState({ selectedPoliticianTwo: politician })}></PoliticianCard>
          </div>
        </div>
      </section>
    );
  }
}