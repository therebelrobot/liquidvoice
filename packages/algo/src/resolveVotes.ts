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

interface EnrichedUserVote extends UserVote {
  // order implies the level of delegation
  delegateMap?: string[];
  // unordered list of people delegating to this person
  delegateFor?: string[];
  votePower?: number;
}

export interface FinalTally {
  [voteId: number]: string[];
}
export interface AlgoReturnValue {
  finalTally: FinalTally;
  votes: {
    [userId: string]: EnrichedUserVote;
  };
}

const onlyUnique = (value: any, index: number | string, self: any[]) =>
  self.indexOf(value) === index;

export const resolveVotes = (userVotes: UserVote[]): AlgoReturnValue => {
  // console.log("running");
  const votesMap = new Map<string, EnrichedUserVote>();
  const finalVotesMap = new Map<number, string[]>();
  const proxyMap = new Map<string, string[]>();
  for (const userVote of userVotes) {
    const enrichedUserVote: EnrichedUserVote = { ...userVote };
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
      enrichedUserVote.vote = 0;
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
          const thisProxy = votesMap.get(proxyId);
          thisVote.delegateMap = [
            ...(thisVote.delegateMap || []),
            proxyId,
            ...(thisProxy.delegateMap || []),
          ];
          votesMap.set(voterId, thisVote);
          votesMap.set(proxyId, thisProxy);
        }
        hasProxy = true;
      }
    }
    if (!hasProxy) {
      refinedProxies.set(delegateId, voterIds);
    }
  }
  const refinedDelegateIds = Array.from(refinedProxies.keys());

  // collapse nested proxies
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
        const thisProxy = votesMap.get(delegateId);
        thisVote.delegateMap = [
          ...(thisVote.delegateMap || []),
          delegateId,
          ...(thisProxy.delegateMap || []),
        ];
        votesMap.set(voterId, thisVote);
        votesMap.set(delegateId, thisProxy);
      }
      if (typeof thisVote.vote === "undefined") {
        thisVote.vote = thisDelegateVote.vote || 0;
      }
      votesMap.set(voterId, thisVote);
    }
  }

  // calculate vote power
  const loopableVotes = Array.from(votesMap.values());
  for (const userVote of loopableVotes) {
    const thisVote = votesMap.get(userVote.userId);
    const usersListingAsDelegate = loopableVotes.filter(
      (v) => v.delegateMap && v.delegateMap.includes(userVote.userId)
    );
    thisVote.votePower = usersListingAsDelegate.length + 1;
    if (usersListingAsDelegate.length > 0) {
      thisVote.delegateFor = usersListingAsDelegate.map((v) => v.userId);
    }
    votesMap.set(userVote.userId, thisVote);
  }
  return {
    finalTally: Object.fromEntries(finalVotesMap),
    votes: Object.fromEntries(votesMap),
  };
};
