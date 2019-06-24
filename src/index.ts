import Koa from 'koa'
import { ApolloServer, gql } from 'apollo-server-koa'
import { readFileSync } from 'fs';
import { join } from 'path';

import * as Query from './resolvers/Query'

const schema = readFileSync(join(__dirname, 'schema.graphql')).toString()
const typeDefs = gql(schema)

const resolvers = {
  Query
}
 
const server = new ApolloServer({ typeDefs, resolvers, playground: true, introspection: true })
 
const app = new Koa();
server.applyMiddleware({ app, path: '/' })
 
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);