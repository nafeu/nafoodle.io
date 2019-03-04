const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const morgan = require('morgan');
const { createStore, applyMiddleware } = require('redux');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);
const api = require('./src/server/api');
const socketEvents = require('./src/server/socket-events');
const reducers = require('./src/server/reducers');
const { logger } = require('./src/helpers');

const store = createStore(reducers, applyMiddleware(logger));

const PORT = process.env.PORT || 8000;

/*
 * Configurations
 */

server.listen(PORT, () => {
  const { port } = server.address();
  console.log(`[ server.js ] Listening on port ${port}`);
});

io.set('heartbeat timeout', 4000);
io.set('heartbeat interval', 2000);
socketEvents.use(io, store);

app.use(morgan('short'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/dist', express.static('dist'));
app.use('/api', api.use(io, store));
