import test from "ava";
import { resolveVotes } from "../resolveVotes";
import { testData } from "./fixtures";

for (const testCase of testData) {
  test(`Algo | Resolve Votes | ${testCase.name}`, (t) => {
    const { input, expected } = testCase;
    const actual = resolveVotes(input);
    t.deepEqual(actual, expected);
  });
}
