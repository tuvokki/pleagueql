import DataLoader from 'dataloader';
import findByIds from 'mongo-find-by-ids';

export default class User {
    constructor(context) {
        this.context = context;
        this.collection = context.db.collection('users');
        this.pubsub = context.pubsub;
        this.loader = new DataLoader(ids => findByIds(this.collection, ids));
    }

    findOneById(id) {
        return this.loader.load(id);
    }

    all({ lastCreatedAt = 0, limit = 10 }) {
        return this.collection.find({
            // createdAt: { $gt: lastCreatedAt },
        }).sort({ createdAt: 1 }).limit(limit).toArray();
    }

    profile(user) {
        return this.context.Profile.findOneById(user.profileId);
    }

    async insert(doc) {
        const docToInsert = Object.assign({}, doc, {
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
        const id = (await this.collection.insertOne(docToInsert)).insertedId;
        this.pubsub.publish('userInserted', await this.findOneById(id));
        return id;
    }

    async updateById(id, doc) {
        const ret = await this.collection.update({ _id: id }, {
            $set: Object.assign({}, doc, {
                updatedAt: Date.now(),
            }),
        });
        this.loader.clear(id);
        this.pubsub.publish('userUpdated', await this.findOneById(id));
        return ret;
    }

    async removeById(id) {
        const ret = this.collection.remove({ _id: id });
        this.loader.clear(id);
        this.pubsub.publish('userRemoved', id);
        return ret;
    }
}