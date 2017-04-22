const resolvers = {
  Team: {
    id(team) {
      return team._id;
    },

    players(team, args, { Team }) {
      return Team.players(team);
    },
  },
  Query: {
    teams(root, { lastCreatedAt, limit }, { Team }) {
      return Team.all({ lastCreatedAt, limit });
    },

    team(root, { id }, { Team }) {
      return Team.findOneById(id);
    },
  },
  Mutation: {
    async createTeam(root, { input }, { Team }) {
      const id = await Team.insert(input);
      return Team.findOneById(id);
    },

    async updateTeam(root, { id, input }, { Team }) {
      await Team.updateById(id, input);
      return Team.findOneById(id);
    },

    removeTeam(root, { id }, { Team }) {
      return Team.removeById(id);
    },
  },
  Subscription: {
    teamCreated: team => team,
    teamUpdated: team => team,
    teamRemoved: id => id,
  },
};

export default resolvers;
