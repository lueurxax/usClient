require('dotenv').load();
const { GraphQLServer } = require('graphql-yoga');
const { Binding } = require('graphql-binding');
const resolvers = require('./resolvers');

const { makeRemoteExecutableSchema } = require('graphql-tools');
const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');

const createServer = async () => {
  const link = new HttpLink({ uri: process.env.TRADE_SERVER_ENDPOINT, fetch });

  const schema = await introspectSchema(link);

  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link,
  });
  return new GraphQLServer({
   typeDefs: 'src/schema.graphql',
   resolvers,
   context: req => (Object.assign(
     {},
     req,
     {
       db: new Binding({ schema: executableSchema })
     },
   )),
 });
};

createServer().then( server => server.start(() => console.log('Server is running on http://localhost:4000')));
