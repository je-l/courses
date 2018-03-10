const createServer = require('./server');
require('dotenv').config();

const { PORT } = process.env;

createServer(PORT).then(({ port: assignedPort }) => {
  console.log('listening on port', assignedPort);
});
