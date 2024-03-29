const express = require('express');
const App = require('./routes/index.js');
const { PORT } = require('./config/index.js');
const swaggerDocs = require('../swagger.js');

const server = express();

server.use(express.json());
server.use('/api', App);

server.listen(PORT, () => {
  console.info(`Server listening on port ${PORT}`)
  swaggerDocs(server, PORT)
});