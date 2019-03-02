const express = require('express');

const api = express.Router();

module.exports = {
  use: (io) => {
    api.get('/test', (req, res) => {
      io.emit('test');
      res.status(200).send('OK');
    });

    return api;
  },
};
