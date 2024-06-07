/* Require Section */
require('dotenv').config();
const Server = require('./models/Server');

/* Instance Section */
const server = new Server();

/* Run Section */
server.listen();