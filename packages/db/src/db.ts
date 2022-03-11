import { Sequelize, Options, Model, DataTypes } from "sequelize";
import path from "path";

export interface InitDbParams {
  filename?: string;
  sequelizeOpts?: Options;
}

export const initDb = async ({ filename, sequelizeOpts }: InitDbParams) => {
  let sequelize;
  if (sequelizeOpts) {
    sequelize = new Sequelize(sequelizeOpts);
  } else {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: path.resolve(__dirname, `../${filename || "db.sqlite"}`),
    });
  }
  await initUser(sequelize);
  await initProposal(sequelize);
  await initRole(sequelize);
  await initCandidateRole(sequelize);
  await initVotes(sequelize);
  return sequelize;
};

export class User extends Model {}
export const initUser = async (sequelize: Sequelize) => {
  await User.init(
    {
      userId: DataTypes.STRING,
      defaultDelegate: DataTypes.STRING,
      profileUsername: DataTypes.STRING,
      profileEmail: DataTypes.STRING,
      profileImage: DataTypes.STRING,
      profileUrl: DataTypes.STRING,
      profileBio: DataTypes.STRING,
      profileLocation: DataTypes.STRING,
      profileMeta: DataTypes.JSON,
      authToken: DataTypes.STRING,
      authTokenExpiry: DataTypes.DATE,
      emailPreferences: DataTypes.JSON,
    },
    { sequelize, modelName: "user" }
  );
  await User.sync({ force: true });
};

export class Proposal extends Model {}
export const initProposal = async (sequelize: Sequelize) => {
  await Proposal.init(
    {
      proposalId: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      status: DataTypes.STRING,
      eventHistory: DataTypes.JSON,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
      voteCloseDate: DataTypes.DATE,
      voteReclaimCloseDate: DataTypes.DATE,
      voteResults: DataTypes.JSON,
      delgatedVotes: DataTypes.JSON,
    },
    { sequelize, modelName: "proposal" }
  );
  await Proposal.sync({ force: true });
};

export class Role extends Model {}
export const initRole = async (sequelize: Sequelize) => {
  await Role.init(
    {
      roleId: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      status: DataTypes.STRING,
      eventHistory: DataTypes.JSON,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
      voteCloseDate: DataTypes.DATE,
      voteReclaimCloseDate: DataTypes.DATE,
      voteResults: DataTypes.JSON,
      delgatedVotes: DataTypes.JSON,
    },
    { sequelize, modelName: "role" }
  );
  await Role.sync({ force: true });
};

export class CandidateRole extends Model {}
export const initCandidateRole = async (sequelize: Sequelize) => {
  await CandidateRole.init(
    {
      candidateRoleId: DataTypes.STRING,
      userId: DataTypes.STRING,
      roleId: DataTypes.STRING,
      status: DataTypes.STRING,
      eventHistory: DataTypes.JSON,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    { sequelize, modelName: "candidateRole" }
  );
  await CandidateRole.sync({ force: true });
};

export class Votes extends Model {}
export const initVotes = async (sequelize: Sequelize) => {
  await Votes.init(
    {
      voteId: DataTypes.STRING,
      userId: DataTypes.STRING,
      type: DataTypes.STRING,
      typeId: DataTypes.STRING,
      vote: DataTypes.INTEGER,
      isDelegated: DataTypes.BOOLEAN,
      isReclaimed: DataTypes.BOOLEAN,
      delegateMap: DataTypes.JSON,
      eventHistory: DataTypes.JSON,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    { sequelize, modelName: "votes" }
  );
  await Votes.sync({ force: true });
};
