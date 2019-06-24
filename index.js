const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const morgan = require('morgan');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

const api = require('./server/api/v1');
const realtime = require('./server/socket');
const store = require('./server/store');
const { addClient } = require('./server/store/actions');

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  const { port } = server.address();
  console.log(`[ server.js ] Listening on port ${port}`);
});

io.set('heartbeat timeout', 4000);
io.set('heartbeat interval', 2000);
io.on('connection', (socket) => {
  store.dispatch(addClient(socket.id));
  realtime.use({ io, socket, store });
});

app.use(morgan('short'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'client/build')));
app.use('/api', api.use(io, store));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});