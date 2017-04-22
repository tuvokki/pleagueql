import DataLoader from 'dataloader';
import findByIds from 'mongo-find-by-ids';

export default class Game {
    constructor(context) {
        this.context = context;
        this.collection = context.db.collection('games');
        this.pubsub = context.pubsub;
        this.loader = new DataLoader(ids => findByIds(this.collection, ids));
    }

    findOneById(id) {
        return this.loader.load(id);
    }

    all({ lastCreatedAt = 0, limit = 10 }) {
        return this.collection.find({
            // createdAt: { $gt: lastCreatedAt },
        }).sort({ startDate: 1 }).limit(limit).toArray();
    }

    teamRed(game) {
        return this.context.Team.findOneById(game.teamRedId);
    }

    teamBlue(game) {
        return this.context.Team.findOneById(game.teamBlueId);
    }

    winner(game) {
        // console.log('find winner for game: ', game)
        return this.context.Team.findOneById(game.winner);
    }

    async insert(doc) {
        const docToInsert = Object.assign({}, doc, {
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
        const id = (await this.collection.insertOne(docToInsert)).insertedId;
        this.pubsub.publish('gameInserted', await this.findOneById(id));
        return id;
    }

    async updateById(id, doc) {
        const ret = await this.collection.update({ _id: id }, {
            $set: Object.assign({}, doc, {
                updatedAt: Date.now(),
            }),
        });
        this.loader.clear(id);
        this.pubsub.publish('gameUpdated', await this.findOneById(id));
        return ret;
    }

    async removeById(id) {
        const ret = this.collection.remove({ _id: id });
        this.loader.clear(id);
        this.pubsub.publish('gameRemoved', id);
        return ret;
    }
}