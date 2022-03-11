import test from "ava";
import { User, Proposal, Role, CandidateRole, Votes, initDb } from "../db";
import { verbose, Database as sqlite3Database } from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";
import { testData } from "./fixtures";

let db: Database;

const Models = {
  User,
  Proposal,
  Role,
  CandidateRole,
  Votes,
} as any;

const createDbConnection = (filename: string) => {
  return open({
    filename,
    driver: sqlite3Database,
  });
};

test.before(async () => {
  await initDb("db.test.sqlite");
  verbose();
  db = await createDbConnection(
    path.resolve(__dirname, `../../db.test.sqlite`)
  );
});

for (const testCase of testData) {
  test(`DB | Models | ${testCase.name}`, async (t) => {
    const { input, expected, query, params, model, method } = testCase;
    await Models[model][method](input);
    const row = await db.get(query, params);
    t.deepEqual(row, expected);
  });
}

// (async () => {
//   await sequelize.sync();
//   const jane = await User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20)
//   });
//   console.log(jane.toJSON());
// })();
