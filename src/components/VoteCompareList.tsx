// Models
import BallotVote from 'models/BallotVote';
// Utils
import BallotVoteUtils from 'utils/BallotVoteUtils';
// Elements
import ProgressBar from 'components/elements/ProgressBar';
import Tag from 'components/elements/Tag';
import VoteResult from 'components/VoteResult';
// Helpers
import Colour, { ColourType } from 'components/helpers/Colour';
import Size from 'components/helpers/Size';
// Styles
import './VoteCompareList.scss';


type VoteCompareListProps = {
  ballotVotesA: BallotVote[];
  ballotVotesB: BallotVote[];
};

/**
 * Renders a list displaying the differences between how two politicians voted
 * @returns 
 */
function VoteCompareList({ ballotVotesA, ballotVotesB }: VoteCompareListProps): JSX.Element {
  const differences = BallotVoteUtils.getVoteDifferences(ballotVotesA, ballotVotesB);
  const percentageDifference = 100 - (differences.length / ballotVotesA.length) * 100;

  const renderVotedTag = (ballotVote: BallotVote) => {
    const voted = ballotVote.getVoted();
    let colour: ColourType;
    switch (voted) {
      case 'Yes':
        colour = Colour.Success;
        break;
      case 'No':
        colour = Colour.Danger;
        break;
      case "Didn't vote":
      case 'Paired':
        colour = Colour.Info;
        break;
      default:
        throw new Error('Invalid voted by');
    }

    return <Tag colour={colour} label={voted} size={Size.Medium}></Tag>;
  };
  const renderDifference = (ballotVoteA: BallotVote, ballotVoteB: BallotVote) => {
    return (
      <dd className="VoteCompareList__Row" key={ballotVoteA.getVoteURL()}>
        <div className='VoteCompareList__VoteDetails'>{renderVotedTag(ballotVoteA)}</div>
        <div className='VoteCompareList__BillDetails'>
          <VoteResult ballotVote={ballotVoteA}></VoteResult>
        </div>
        <div className='VoteCompareList__VoteDetails'>{renderVotedTag(ballotVoteB)}</div>
      </dd>
    );
  };
  return (
    <section className="section VoteCompareList">
      <ProgressBar colour={Colour.Success} percentage={percentageDifference} size='large'></ProgressBar>
      <dl>
        <dt className="title is-4 has-text-centered">Here's where they voted differently</dt>
        {
          differences.map(difference => renderDifference(difference.ballotVoteA, difference.ballotVoteB))
        }
      </dl>
    </section>
  );

}


export default VoteCompareList;