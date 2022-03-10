import { AlgoReturnValue, UserVote } from "../algo";

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
    },
    user2: {
      userId: "user2",
      vote: 2,
    },
    user3: {
      userId: "user3",
      vote: 1,
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
    },
    user2: {
      userId: "user2",
      vote: 2,
    },
    user3: {
      userId: "user3",
      vote: 2,
      delegateId: "user2",
      delegateMap: ["user2"],
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
    },
    user2: {
      userId: "user2",
      vote: 2,
      delegateId: "user4",
      delegateMap: ["user4"],
    },
    user3: {
      userId: "user3",
      vote: 2,
      delegateId: "user2",
      delegateMap: ["user2", "user4"],
    },
    user4: {
      userId: "user4",
      vote: 2,
    },
  },
};

export const inputs: { [testName: string]: UserVote[] } = {
  basicVote,
  basicDelegateVote,
  nestedDelegateVote,
};
export const expecteds: { [testName: string]: AlgoReturnValue } = {
  basicVoteResults,
  basicDelegateVoteResults,
  nestedDelegateVoteResults,
};
