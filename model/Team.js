import DataLoader from 'dataloader';
import findByIds from 'mongo-find-by-ids';

export default class Team {
    constructor(context) {
        this.context = context;
        this.collection = context.db.collection('teams');
        this.pubsub = context.pubsub;
        this.loader = new DataLoader(ids => findByIds(this.collection, ids));
    }

    findOneById(id) {
        console.log('Find by this id: ', id)
        return this.loader.load(id);
    }

    all({ lastCreatedAt = 0, limit = 10 }) {
        return this.collection.find({
            // createdAt: { $gt: lastCreatedAt },
        }).sort({ teamElo: -1 }).limit(limit).toArray();
    }

    players(team) {
        return [this.context.Player.findOneById(team.players[0]), this.context.Player.findOneById(team.players[1])];
    }

    async insert(doc) {
        const docToInsert = Object.assign({}, doc, {
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
        const id = (await this.collection.insertOne(docToInsert)).insertedId;
        this.pubsub.publish('teamInserted', await this.findOneById(id));
        return id;
    }

    async updateById(id, doc) {
        const ret = await this.collection.update({ _id: id }, {
            $set: Object.assign({}, doc, {
                updatedAt: Date.now(),
            }),
        });
        this.loader.clear(id);
        this.pubsub.publish('teamUpdated', await this.findOneById(id));
        return ret;
    }

    async removeById(id) {
        const ret = this.collection.remove({ _id: id });
        this.loader.clear(id);
        this.pubsub.publish('teamRemoved', id);
        return ret;
    }
}