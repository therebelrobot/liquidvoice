export interface UserVote {
  userId: string;
  // 0 is no-vote specified, as opposed to choosing to abstain,
  //    which should otherwise be defined.
  // The rest of the numbers are arbitrary assignments
  // e.g 1 = abstain, 2 = yes, 3 = no
  // e.g 1 = candidate 1, 2 = candidate 2, 3 = candidate 3
  vote?: number;
  delegateId?: string;
}

interface UserVoteWithDelegateMap extends UserVote {
  // order implies the level of delegation
  delegateMap?: string[];
}

export interface FinalTally {
  [voteId: number]: string[];
}
export interface AlgoReturnValue {
  finalTally: FinalTally;
  votes: {
    [userId: string]: UserVoteWithDelegateMap;
  };
}

const onlyUnique = (value: any, index: number | string, self: any[]) =>
  self.indexOf(value) === index;

export const algo = (userVotes: UserVote[]): AlgoReturnValue => {
  // console.log("running");
  const votesMap = new Map<string, UserVoteWithDelegateMap>();
  const finalVotesMap = new Map<number, string[]>();
  const proxyMap = new Map<string, string[]>();
  for (const userVote of userVotes) {
    const enrichedUserVote: UserVoteWithDelegateMap = { ...userVote };
    if (userVote.vote !== undefined) {
      const vote = userVote.vote;
      const currentVotes = finalVotesMap.get(vote) || [];
      currentVotes.push(userVote.userId);
      finalVotesMap.set(vote, currentVotes);
    } else if (userVote.delegateId !== undefined) {
      const delegateId = userVote.delegateId;
      const currentProxy = proxyMap.get(delegateId) || [];
      currentProxy.push(userVote.userId);
      enrichedUserVote.delegateMap = [delegateId];
      proxyMap.set(delegateId, currentProxy);
    } else {
      const currentVotes = finalVotesMap.get(0) || [];
      currentVotes.push(userVote.userId);
      finalVotesMap.set(0, currentVotes);
    }
    votesMap.set(userVote.userId, enrichedUserVote);
  }
  const refinedProxies = new Map<string, string[]>();
  const proxyIds = Array.from(proxyMap.keys());
  for (const [delegateId, voterIds] of proxyMap) {
    let hasProxy = false;
    for (const proxyId of proxyIds) {
      const currentProxyVoters = proxyMap.get(proxyId) || [];
      if (currentProxyVoters.includes(delegateId)) {
        const refinedVoters = currentProxyVoters.concat(voterIds);
        refinedProxies.set(proxyId, refinedVoters);
        for (const voterId of voterIds) {
          const thisVote = votesMap.get(voterId);
          thisVote.delegateMap = [...(thisVote.delegateMap || []), proxyId];
        }
        hasProxy = true;
      }
    }
    if (!hasProxy) {
      refinedProxies.set(delegateId, voterIds);
    }
  }
  const refinedDelegateIds = Array.from(refinedProxies.keys());
  for (const delegateId of refinedDelegateIds) {
    const thisDelegateVote = votesMap.get(delegateId);
    const thisDelegateVoterIds = refinedProxies.get(delegateId);
    if (thisDelegateVote.hasOwnProperty("vote")) {
      const vote = thisDelegateVote.vote;
      const currentVotes = finalVotesMap.get(vote) || [];
      const currentVotesWithDelegate =
        currentVotes.concat(thisDelegateVoterIds);
      // .filter(onlyUnique);
      finalVotesMap.set(vote, currentVotesWithDelegate);
    } else {
      const currentVotes = finalVotesMap.get(0) || [];
      const currentVotesWithDelegate =
        currentVotes.concat(thisDelegateVoterIds);
      // .filter(onlyUnique);
      finalVotesMap.set(0, currentVotesWithDelegate);
    }

    for (const voterId of thisDelegateVoterIds) {
      const thisVote = votesMap.get(voterId);
      if (!(thisVote.delegateMap || []).includes(delegateId)) {
        thisVote.delegateMap = [...(thisVote.delegateMap || []), delegateId];
      }
      if (typeof thisVote.vote === "undefined") {
        thisVote.vote = thisDelegateVote.vote || 0;
      }
      votesMap.set(voterId, thisVote);
    }
  }
  return {
    finalTally: Object.fromEntries(finalVotesMap),
    votes: Object.fromEntries(votesMap),
  };
};
