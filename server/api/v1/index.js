import express from 'express';

const api = express.Router();

export default {
  use: (io) => {
    api.get('/test', (req, res) => {
      io.emit('test');
      res.status(200).send('OK');
    });

    return api;
  },
};
