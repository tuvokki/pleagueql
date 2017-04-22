const resolvers = {
    Game: {
        id(game) {
            return game._id;
        },

        teamRed(game, args, { Game }) {
            return Game.teamRed(game);
        },

        teamBlue(game, args, { Game }) {
            return Game.teamBlue(game);
        },

        winner(game, args, { Game }) {
            return Game.winner(game);
        },
    },
    Query: {
        games(root, { lastCreatedAt, limit }, { Game }) {
            return Game.all({ lastCreatedAt, limit });
        },

        game(root, { id }, { Game }) {
            return Game.findOneById(id);
        },
    },
    Mutation: {
        async createGame(root, { input }, { Game }) {
            const id = await Game.insert(input);
            return Game.findOneById(id);
        },

        async updateGame(root, { id, input }, { Game }) {
            await Game.updateById(id, input);
            return Game.findOneById(id);
        },

        removeGame(root, { id }, { Game }) {
            return Game.removeById(id);
        },
    },
    Subscription: {
        gameCreated: game => game,
        gameUpdated: game => game,
        gameRemoved: id => id,
    },
};

export default resolvers;