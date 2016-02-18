import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import Gql from 'react-gql';
import { genActionsAndReducers } from 'redux-lego';
import { browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';

import cellar from './cellar';

let logger = createLogger();

const reduxRouterMiddleware = syncHistory(browserHistory);

let {actions, reducers} = genActionsAndReducers(cellar);

reducers = Object.assign({}, reducers, {
  routing: routeReducer
});

let createStoreWithMiddleware = applyMiddleware(
  Gql.connect,
  logger,
  reduxRouterMiddleware,
)(createStore);

const store = createStoreWithMiddleware(
  combineReducers(reducers)
);

reduxRouterMiddleware.listenForReplays(store);

export { actions, reducers, store };
