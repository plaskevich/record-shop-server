import 'dotenv/config';

export default {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  mongoUrl: process.env.MONGO_URI as string,
};
