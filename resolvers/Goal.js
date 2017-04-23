const resolvers = {
  Goal: {
    id(goal) {
      return goal._id;
    },

    player(goal, args, { Goal }) {
      return Goal.player(goal);
    },

    teamId(goal, args, { Goal }) {
      return Goal.teamId(goal);
    },
  },
  Query: {
    goals(root, { lastCreatedAt, limit }, { Goal }) {
      return Goal.all({ lastCreatedAt, limit });
    },

    goal(root, { id }, { Goal }) {
      return Goal.findOneById(id);
    },
  },
  Mutation: {
    async createGoal(root, { input }, { Goal }) {
      const id = await Goal.insert(input);
      return Goal.findOneById(id);
    },

    async updateGoal(root, { id, input }, { Goal }) {
      await Goal.updateById(id, input);
      return Goal.findOneById(id);
    },

    removeGoal(root, { id }, { Goal }) {
      return Goal.removeById(id);
    },
  },
  Subscription: {
    goalCreated: goal => goal,
    goalUpdated: goal => goal,
    goalRemoved: id => id,
  },
};

export default resolvers;
