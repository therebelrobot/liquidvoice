import test from "ava";
import { algo } from "../algo";
import { inputs, expecteds } from "./fixtures";

for (const testName of Object.keys(inputs)) {
  test(`Algo | ${testName}`, (t) => {
    const input = inputs[testName];
    const expected = expecteds[`${testName}Results`];
    const actual = algo(input);
    t.deepEqual(actual, expected);
  });
}
