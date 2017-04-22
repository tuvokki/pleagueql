import DataLoader from 'dataloader';
import findByIds from 'mongo-find-by-ids';

export default class Player {
    constructor(context) {
        this.context = context;
        this.collection = context.db.collection('players');
        this.pubsub = context.pubsub;
        this.loader = new DataLoader(ids => findByIds(this.collection, ids));
    }

    findOneById(id) {
        return this.loader.load(id);
    }

    all({ lastCreatedAt = 0, limit = 10 }) {
        return this.collection.find({}).sort({ elo: -1 }).limit(limit).toArray();
    }

    active({ lastCreatedAt = 0, limit = 10 }) {
        return this.collection.find({
            retired: { $in: [null, false] }
        }).sort({ elo: -1 }).limit(limit).toArray();
    }

    // joinDate(player) {
    //     return this.context.Date.findOneById(player.joinDateId);
    // }

    belongsTo(player) {
        return this.context.User.findOneById(player.belongsToId);
    }

    // lastPlayed(player, args) {
    //     return this.context.Date.collection.find({
    //         _id: { $in: player.lastPlayedIds || [] },
    //     }).sort({ createdAt: 1 }).toArray();
    // }

    async insert(doc) {
        const docToInsert = Object.assign({}, doc, {
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
        const id = (await this.collection.insertOne(docToInsert)).insertedId;
        this.pubsub.publish('playerInserted', await this.findOneById(id));
        return id;
    }

    async updateById(id, doc) {
        const ret = await this.collection.update({ _id: id }, {
            $set: Object.assign({}, doc, {
                updatedAt: Date.now(),
            }),
        });
        this.loader.clear(id);
        this.pubsub.publish('playerUpdated', await this.findOneById(id));
        return ret;
    }

    async removeById(id) {
        const ret = this.collection.remove({ _id: id });
        this.loader.clear(id);
        this.pubsub.publish('playerRemoved', id);
        return ret;
    }
}