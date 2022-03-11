import { AlgoReturnValue, UserVote } from "../resolveVotes";

export const basicVote: UserVote[] = [
  {
    userId: "user1",
    vote: 1,
  },
  {
    userId: "user2",
    vote: 2,
  },
  {
    userId: "user3",
    vote: 1,
  },
];

export const basicVoteResults: AlgoReturnValue = {
  finalTally: {
    1: ["user1", "user3"],
    2: ["user2"],
  },
  votes: {
    user1: {
      userId: "user1",
      vote: 1,
      votePower: 1,
    },
    user2: {
      userId: "user2",
      vote: 2,
      votePower: 1,
    },
    user3: {
      userId: "user3",
      vote: 1,
      votePower: 1,
    },
  },
};

// ============================================================================

export const basicDelegateVote: UserVote[] = [
  {
    userId: "user1",
    vote: 1,
  },
  {
    userId: "user2",
    vote: 2,
  },
  {
    userId: "user3",
    delegateId: "user2",
  },
];

export const basicDelegateVoteResults: AlgoReturnValue = {
  finalTally: {
    1: ["user1"],
    2: ["user2", "user3"],
  },
  votes: {
    user1: {
      userId: "user1",
      vote: 1,
      votePower: 1,
    },
    user2: {
      userId: "user2",
      vote: 2,
      votePower: 2,
    },
    user3: {
      userId: "user3",
      vote: 2,
      delegateId: "user2",
      delegateMap: ["user2"],
      votePower: 1,
    },
  },
};

// ============================================================================

export const nestedDelegateVote: UserVote[] = [
  {
    userId: "user1",
    vote: 1,
  },
  {
    userId: "user2",
    delegateId: "user4",
  },
  {
    userId: "user3",
    delegateId: "user2",
  },
  {
    userId: "user4",
    vote: 2,
  },
];

export const nestedDelegateVoteResults: AlgoReturnValue = {
  finalTally: {
    1: ["user1"],
    2: ["user4", "user2", "user3"],
  },
  votes: {
    user1: {
      userId: "user1",
      vote: 1,
      votePower: 1,
    },
    user2: {
      userId: "user2",
      vote: 2,
      delegateId: "user4",
      delegateMap: ["user4"],
      votePower: 2,
    },
    user3: {
      userId: "user3",
      vote: 2,
      delegateId: "user2",
      delegateMap: ["user2", "user4"],
      votePower: 1,
    },
    user4: {
      userId: "user4",
      vote: 2,
      votePower: 3,
    },
  },
};

// ============================================================================

export const noVoteDefaultState: UserVote[] = [
  {
    userId: "user1",
  },
  {
    userId: "user2",
    delegateId: "user4",
  },
  {
    userId: "user3",
    delegateId: "user2",
  },
  {
    userId: "user4",
    vote: 2,
  },
];

export const noVoteDefaultStateResults: AlgoReturnValue = {
  finalTally: {
    0: ["user1"],
    2: ["user4", "user2", "user3"],
  },
  votes: {
    user1: {
      userId: "user1",
      vote: 0,
      votePower: 1,
    },
    user2: {
      userId: "user2",
      vote: 2,
      delegateId: "user4",
      delegateMap: ["user4"],
      votePower: 2,
    },
    user3: {
      userId: "user3",
      vote: 2,
      delegateId: "user2",
      delegateMap: ["user2", "user4"],
      votePower: 1,
    },
    user4: {
      userId: "user4",
      vote: 2,
      votePower: 3,
    },
  },
};

// ============================================================================

export const noVoteDelegate: UserVote[] = [
  {
    userId: "user1",
    vote: 1,
  },
  {
    userId: "user2",
    delegateId: "user4",
  },
  {
    userId: "user3",
    delegateId: "user2",
  },
  {
    userId: "user4",
  },
];

export const noVoteDelegateResults: AlgoReturnValue = {
  finalTally: {
    0: ["user4", "user2", "user3"],
    1: ["user1"],
  },
  votes: {
    user1: {
      userId: "user1",
      vote: 1,
      votePower: 1,
    },
    user2: {
      userId: "user2",
      vote: 0,
      delegateId: "user4",
      delegateMap: ["user4"],
      votePower: 2,
    },
    user3: {
      userId: "user3",
      vote: 0,
      delegateId: "user2",
      delegateMap: ["user2", "user4"],
      votePower: 1,
    },
    user4: {
      userId: "user4",
      vote: 0,
      votePower: 3,
    },
  },
};

// ============================================================================

export const complexVote: UserVote[] = [
  {
    userId: "user1",
    vote: 1,
  },
  {
    userId: "user2",
    delegateId: "user4",
  },
  {
    userId: "user3",
    delegateId: "user2",
  },
  {
    userId: "user4",
  },
  {
    userId: "user5",
    vote: 2,
  },
  {
    userId: "user6",
    delegateId: "user5",
  },
  {
    userId: "user7",
    delegateId: "user6",
  },
  {
    userId: "user8",
    delegateId: "user7",
  },
  {
    userId: "user9",
    delegateId: "user5",
  },
  {
    userId: "user10",
    delegateId: "user9",
  },
  {
    userId: "user11",
    delegateId: "user1",
  },
];

export const complexVoteResults: AlgoReturnValue = {
  finalTally: {
    0: ["user4", "user2", "user3"],
    1: ["user1", "user11"],
    2: ["user5", "user6", "user9", "user10", "user7", "user8"],
  },
  votes: {
    user1: {
      userId: "user1",
      vote: 1,
      votePower: 2,
    },
    user2: {
      userId: "user2",
      delegateId: "user4",
      delegateMap: ["user4"],
      vote: 0,
      votePower: 2,
    },
    user3: {
      userId: "user3",
      delegateId: "user2",
      delegateMap: ["user2", "user4"],
      vote: 0,
      votePower: 1,
    },
    user4: {
      userId: "user4",
      vote: 0,
      votePower: 3,
    },
    user5: {
      userId: "user5",
      vote: 2,
      votePower: 6,
    },
    user6: {
      userId: "user6",
      delegateId: "user5",
      delegateMap: ["user5"],
      vote: 2,
      votePower: 3,
    },
    user7: {
      userId: "user7",
      delegateId: "user6",
      delegateMap: ["user6", "user5"],
      vote: 2,
      votePower: 2,
    },
    user8: {
      userId: "user8",
      delegateId: "user7",
      delegateMap: ["user7", "user6", "user5"],
      vote: 2,
      votePower: 1,
    },
    user9: {
      userId: "user9",
      delegateId: "user5",
      delegateMap: ["user5"],
      vote: 2,
      votePower: 2,
    },
    user10: {
      userId: "user10",
      delegateId: "user9",
      delegateMap: ["user9", "user5"],
      vote: 2,
      votePower: 1,
    },
    user11: {
      userId: "user11",
      delegateId: "user1",
      delegateMap: ["user1"],
      vote: 1,
      votePower: 1,
    },
  },
};

// ============================================================================

export const testData = [
  {
    name: "basic vote",
    input: basicVote,
    expected: basicVoteResults,
  },
  {
    name: "basic delegate vote",
    input: basicDelegateVote,
    expected: basicDelegateVoteResults,
  },
  {
    name: "nested delegate vote",
    input: nestedDelegateVote,
    expected: nestedDelegateVoteResults,
  },
  {
    name: "no vote default state",
    input: noVoteDefaultState,
    expected: noVoteDefaultStateResults,
  },
  {
    name: "no vote delegate",
    input: noVoteDelegate,
    expected: noVoteDelegateResults,
  },
  {
    name: "complex vote",
    input: complexVote,
    expected: complexVoteResults,
  },
];
