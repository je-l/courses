const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('./controller/blog');
require('dotenv').config();

const PORT = 3003;

const app = express();

const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI);
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/blogs', blogRouter);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('close', () => {
  mongoose.connection.close();
});

module.exports = { app, server };
