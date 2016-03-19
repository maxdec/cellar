import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import Gql from 'react-gql';
import { genActionsAndReducers } from 'redux-lego';
import { browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';

import cellar from './cellar';

const reduxRouterMiddleware = syncHistory(browserHistory);

let {actions, reducers} = genActionsAndReducers(cellar);

reducers = Object.assign({}, reducers, {
  routing: routeReducer
});

let middlewares = [Gql.connect, reduxRouterMiddleware];
if (process.env.NODE_ENV !== 'production') {
  let logger = createLogger();
  middlewares = [...middlewares, logger];
}

let createStoreWithMiddleware = applyMiddleware(
  ...middlewares
)(createStore);

const store = createStoreWithMiddleware(
  combineReducers(reducers)
);

reduxRouterMiddleware.listenForReplays(store);

export { actions, reducers, store };
