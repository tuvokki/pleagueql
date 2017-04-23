import fs from 'fs';

function requireGraphQL(name) {
    const filename = require.resolve(name);
    return fs.readFileSync(filename, 'utf8');
}

const typeDefs = [`
  scalar ObjID
  type Query {
    # A placeholder, please ignore
    __placeholder: Int
  }
  type Mutation {
    # A placeholder, please ignore
    __placeholder: Int
  }
  type Subscription {
    # A placeholder, please ignore
    __placeholder: Int
  }
`];

typeDefs.push(requireGraphQL('./Profile.graphql'));
typeDefs.push(requireGraphQL('./Role.graphql'));
typeDefs.push(requireGraphQL('./Date.graphql'));
typeDefs.push(requireGraphQL('./Email.graphql'));

export default typeDefs;

//
typeDefs.push(requireGraphQL('./User.graphql'));
typeDefs.push(requireGraphQL('./Player.graphql'));
typeDefs.push(requireGraphQL('./Team.graphql'));

typeDefs.push(requireGraphQL('./Game.graphql'));

typeDefs.push(requireGraphQL('./Goal.graphql'));
