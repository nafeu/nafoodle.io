const { createStore, applyMiddleware } = require('redux');
const reducers = require('./reducers');
const { logger } = require('../utils/helpers');

module.exports = createStore(reducers, applyMiddleware(logger));