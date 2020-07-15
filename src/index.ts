import config from './config';
import { GraphQLServer } from 'graphql-yoga';
import { resolvers } from './resolvers';
import { UserModel } from './models/User';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
const schema = './src/schema.graphql';
const chalk = require('chalk');
const bodyParser = require('body-parser');

mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log('✅\xa0 Connection Established\n');
});

mongoose.connection.on('error', () => {
  console.log('❌\xa0 Connection failed');
});

const context = async (req: any) => {
  const { request } = req;
  // get the user token from the headers
  const token = request.headers.authorization;
  // try to retrieve a user with the token
  if (token) {
    const currentUser = await getUserByToken(token);

    return { currentUser };
  } else return null;
};

const server = new GraphQLServer({
  typeDefs: schema,
  resolvers,
  context,
  resolverValidationOptions: { requireResolversForResolveType: false },
});

const PORT = process.env.PORT || 5000;

server.express.use(bodyParser.urlencoded({ extended: false }));
server.express.use(bodyParser.json());

server.start({ port: PORT }, async () => {
  console.log(
    '\n🚀\xa0 Server is running on: ' +
      chalk.hex('#00bfff').underline(`http://localhost:${PORT}\n`),
  );
});

const getUserByToken = async (token: string) => {
  if (!token) return null;
  token = token.replace('Bearer ', '');
  const userAuth = jwt.verify(token, 'secret');
  const currentUser = UserModel.findById((<any>userAuth).userId);
  return currentUser;
};
