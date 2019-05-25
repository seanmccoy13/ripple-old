import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import favicon from 'serve-favicon';
import path from 'path';
import session from 'express-session';
import uuid from 'uuid';
import { redirectToHTTPS } from 'express-http-to-https';
import MongoStore from 'connect-mongo';
import { Employee, Survey, Company, Result, User, File } from './models';
import resolvers from './resolvers';
import typeDefs from './schema';
const { MONGO_URI } = process.env;

const MongoDBStoreWithSession = MongoStore(session);
mongoose.Promise = global.Promise;
const options = {
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms,
  useNewUrlParser: true
};
mongoose.connect(
  MONGO_URI,
  options
);

mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance')) // eslint-disable-line no-console
  .on('error', error => console.log('Error connecting to MongoLab:', error)); // eslint-disable-line no-console

const store = new MongoDBStoreWithSession({
  mongooseConnection: mongoose.connection,
  ttl: 7 * 24 * 60 * 60, // 7 days
});

const app = express();

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(compression({ filter: shouldCompress }));

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

app.use(express.static(path.join(__dirname, '../build')));
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/]));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      models: {
        Employee,
        Survey,
        Company,
        Result,
        User,
        File,
      },
      req,
      session: req.session,
      url: req.url,
    };
  },
});

app.use(
  session({
    genid: () => {
      return uuid.v4();
    },
    store,
    name: 'qid',
    secret: 'SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

server.applyMiddleware({ app });

export default app;
