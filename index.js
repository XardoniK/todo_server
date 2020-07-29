import express from 'express';
import graphqlHTTP from "express-graphql";
import schema from './schema/schema';
import mongoose from 'mongoose';
import {ApolloServer} from "apollo-server";

// const app = express();
//
// app.use('/graphql', graphqlHTTP({
// 	schema,
// 	graphiql: true,
// }));
//
// app.listen(4000, () => {
// 	console.log('Listening on :4000');
// });

const server = new ApolloServer({schema});

mongoose.connect('mongodb://127.0.0.1:27017/test2');

server.listen(4000).then(({url}) => {
	console.log(`Server at ${url}`);
});

