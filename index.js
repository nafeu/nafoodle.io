const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const morgan = require('morgan');
const { createStore, applyMiddleware } = require('redux');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);
const api = require('./server/api');
const socketEvents = require('./server/socket-events');
const reducers = require('./server/reducers');
const { logger } = require('./server/helpers');

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
app.use(express.static(path.resolve(__dirname, 'client/build')));
app.use('/api', api.use(io, store));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});