require('dotenv').load();
const { GraphQLServer } = require('graphql-yoga');
const { Binding } = require('graphql-binding');
const resolvers = require('./resolvers');

const { makeRemoteExecutableSchema, introspectSchema } = require('graphql-tools');
const { HttpLink } = require('apollo-link-http');
const { ApolloLink } = require('apollo-link');
const fetch = require('node-fetch');

const createServer = async () => {
  const link = new HttpLink({ uri: process.env.TRADE_SERVER_ENDPOINT, fetch });
  const middlewareLink = (operation, forward) => {
    operation.setContext(context => ({
        ...context,
        headers: {
          ...context.graphqlContext.headers,
        }
      }));
    return forward(operation);
  };

  const schema = await introspectSchema(link);

  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link: ApolloLink.from([middlewareLink, link]),
  });
  return new GraphQLServer({
   typeDefs: 'src/schema.graphql',
   resolvers,
   context: req => (
     Object.assign(
       {},
       req,
       {
         db: new Binding({ schema: executableSchema })
       },
     ))
   });
};

createServer()
  .then( server => server.start({ port: 3002 }, () => console.log('Server is running on http://localhost:3002')));
