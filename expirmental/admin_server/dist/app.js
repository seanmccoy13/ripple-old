'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloServerExpress = require('apollo-server-express');

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _expressHttpToHttps = require('express-http-to-https');

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _models = require('./models');

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { MONGO_URI } = process.env;

const MongoDBStoreWithSession = (0, _connectMongo2.default)(_expressSession2.default);
_mongoose2.default.Promise = global.Promise;
const options = {
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500 // Reconnect every 500ms
};
_mongoose2.default.connect(MONGO_URI, options);

_mongoose2.default.connection.once('open', () => console.log('Connected to MongoLab instance')) // eslint-disable-line no-console
.on('error', error => console.log('Error connecting to MongoLab:', error)); // eslint-disable-line no-console

const store = new MongoDBStoreWithSession({
  mongooseConnection: _mongoose2.default.connection,
  ttl: 7 * 24 * 60 * 60 // 7 days
});

const app = (0, _express2.default)();

app.disable('x-powered-by');
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cors2.default)({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use((0, _compression2.default)({ filter: shouldCompress }));

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return _compression2.default.filter(req, res);
}

app.use(_express2.default.static(_path2.default.join(__dirname, '../build')));
app.use((0, _serveFavicon2.default)(_path2.default.join(__dirname, 'favicon.ico')));
app.use((0, _expressHttpToHttps.redirectToHTTPS)([/localhost:(\d{4})/], [/\/insecure/]));
app.get('/*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../build', 'index.html'));
});

const server = new _apolloServerExpress.ApolloServer({
  typeDefs: _schema2.default,
  resolvers: _resolvers2.default,
  context: async ({ req }) => {
    return {
      models: {
        Employee: _models.Employee,
        Survey: _models.Survey,
        Company: _models.Company,
        Result: _models.Result,
        User: _models.User,
        File: _models.File
      },
      req,
      session: req.session,
      url: req.url
    };
  }
});

app.use((0, _expressSession2.default)({
  genid: () => {
    return _uuid2.default.v4();
  },
  store,
  name: 'qid',
  secret: 'SESSION_SECRET',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
}));

server.applyMiddleware({ app });

exports.default = app;
//# sourceMappingURL=app.js.map