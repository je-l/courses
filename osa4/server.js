const express = require('./util/asyncExpress');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('./controller/blog');
const userRouter = require('./controller/user');
const loginRouter = require('./controller/login');
const tokenExtract = require('./middlware/tokenExtract');
const authenticate = require('./middlware/authenticate');
const errorMiddleware = require('./middlware/500');

require('dotenv').config();

const { MONGO_URI } = process.env;

const app = express();

mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());

app.use(tokenExtract);
app.use(authenticate);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(errorMiddleware);

const createApp = listenPort => {
  return new Promise(resolve => {
    const server = app.listen(listenPort, () => {
      const { port } = server.address();

      const close = () => {
        mongoose.connection.close();
        server.close();
      };

      resolve({ close, app, port });
    });
  });
};

const createServer = listenPort => {
  return mongoose.connect(MONGO_URI)
    .then(() => {
      return createApp(listenPort);
    })
    .catch(e => console.error(e));
};

module.exports = createServer;
