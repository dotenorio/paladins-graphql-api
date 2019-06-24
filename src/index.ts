import Koa from 'koa'
import { ApolloServer, gql } from 'apollo-server-koa'
import { readFileSync } from 'fs';

import * as Query from './resolvers/Query'

const schema = readFileSync('./src/schema.graphql').toString()
const typeDefs = gql(schema)

const resolvers = {
  Query
}
 
const server = new ApolloServer({ typeDefs, resolvers })
 
const app = new Koa();
server.applyMiddleware({ app })
 
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);