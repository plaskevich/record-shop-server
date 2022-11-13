import config from './config';
import { createServer } from '@graphql-yoga/node';
import { resolvers } from './resolvers';
import { UserModel } from './models/User';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import express from 'express';
import { typeDefs } from './schema';

mongoose.connect(config.mongoUrl);

mongoose.connection.on('connected', () => {
  console.log('✅\xa0 Connection Established\n');
});

mongoose.connection.on('error', () => {
  console.log('❌\xa0 Connection failed');
});

const context = async (req: any) => {
  const { request } = req;
  // get the user token from the headers
  const token = request.headers.get('authorization');
  // try to retrieve a user with the token
  if (token) {
    const currentUser = await getUserByToken(token);
    return { currentUser };
  } else return null;
};

const app = express();

const server = createServer({
  schema: { typeDefs, resolvers },
  context,
});

app.use('/graphql', server);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `\n🚀\xa0 Server is running on: http://localhost:${PORT}/graphql`
  );
});

async function getUserByToken(token: string) {
  if (!token) return null;
  token = token.replace('Bearer ', '');
  const userAuth = jwt.verify(token, 'secret');
  const currentUser = await UserModel.findById((userAuth as any).userId);
  if (currentUser) currentUser.id = currentUser._id;
  return currentUser;
}
