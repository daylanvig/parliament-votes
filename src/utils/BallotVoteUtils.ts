import BallotVote from 'models/BallotVote';

type BallotVoteDifference = {
  ballotVoteA: BallotVote;
  ballotVoteB: BallotVote;
};

export default class BallotVoteUtils {
  /**
   * Get the differences between two ballot votes
   * @param ballotVotesA An array of how one politician has voted
   * @param ballotVotesB An array of how another has voted
   * @returns An array containing objects for any ballots where politicians did not vote the same
   */
  public static getVoteDifferences(ballotVotesA: BallotVote[], ballotVotesB: BallotVote[]): BallotVoteDifference[] {
    const ballotVoteDifferences: BallotVoteDifference[] = [];

    // because we're comparing the same sessions (or should be),
    // they should be the same length since the api returns "didnt vote" rather than not including them
    if (ballotVotesA.length !== ballotVotesB.length) {
      throw new Error('BallotVotes are not of equivalent length. Ensure same session is compared.');
    }

    for (let i = 0; i < ballotVotesA.length; i += 1) {
      const ballotVoteA = ballotVotesA[i];
      const ballotVoteB = ballotVotesB.find(bv => bv.getVoteURL() === ballotVoteA.getVoteURL());
      if (ballotVoteB == null) {
        throw new Error(`Ballot not found - ${ballotVoteA.getVoteURL()}`);
      }

      if (ballotVoteA.getVoted() !== ballotVoteB.getVoted()) {
        ballotVoteDifferences.push({
          ballotVoteA,
          ballotVoteB
        });
      }
    }

    return ballotVoteDifferences;
  }
}