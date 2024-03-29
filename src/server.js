const express = require('express');
const App = require('./routes/index.js');
const { PORT } = require('./config/index.js');

const server = express();

server.use(express.json());
server.use(App);

server.listen(PORT, () => {
  console.info(`Server listening on port ${PORT}`)
});