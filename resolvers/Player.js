const resolvers = {
    Player: {
        id(player) {
            return player._id;
        },

        // joinDate(player, args, { Player }) {
        //   return Player.joinDate(player);
        // },

        belongsTo(player, args, { Player }) {
            return Player.belongsTo(player);
        },

        lastPlayed(player, args, { Player }) {
            if (player.lastPlayed)
                return new Date(player.lastPlayed.slice(-1)[0]).toISOString()
            return 'No last played record.'
        },
    },
    Query: {
        players(root, { lastCreatedAt }, { Player }) {
            return Player.all({ lastCreatedAt });
        },

        active(root, { lastCreatedAt, limit }, { Player }) {
            return Player.active({ lastCreatedAt, limit });
        },

        player(root, { id }, { Player }) {
            return Player.findOneById(id);
        },
    },
    Mutation: {
        async createPlayer(root, { input }, { Player }) {
            const id = await Player.insert(input);
            return Player.findOneById(id);
        },

        async updatePlayer(root, { id, input }, { Player }) {
            await Player.updateById(id, input);
            return Player.findOneById(id);
        },

        removePlayer(root, { id }, { Player }) {
            return Player.removeById(id);
        },
    },
    Subscription: {
        playerCreated: player => player,
        playerUpdated: player => player,
        playerRemoved: id => id,
    },
};

export default resolvers;