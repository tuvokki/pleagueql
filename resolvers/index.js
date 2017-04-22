import { ObjectId } from 'mongodb';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { merge } from 'lodash';

const resolvers = {};

resolvers.ObjID = new GraphQLScalarType({
    name: 'ObjID',
    description: 'Id representation, based on Mongo Object Ids',
    parseValue(value) {
        return ObjectId(value);
    },
    serialize(value) {
        return value.toString();
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return ObjectId(ast.value);
        }
        return null;
    },
});

export default resolvers;

//
import userResolvers from './User';
merge(resolvers, userResolvers);

import playerResolvers from './Player';
merge(resolvers, playerResolvers);

import teamResolvers from './Team';
merge(resolvers, teamResolvers);

import gameResolvers from './Game';
merge(resolvers, gameResolvers);
