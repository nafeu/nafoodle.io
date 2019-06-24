import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { logger } from '../utils/helpers';

export default createStore(reducers, applyMiddleware(logger));
