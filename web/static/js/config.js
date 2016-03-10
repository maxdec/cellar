import Gql from 'react-gql';
import { actions, store } from './store';
import { graphql } from './utils';

Gql.set({
  store,
  fetchAndDispatch,
  logger: false,
});

// custom communication strategy
function fetchAndDispatch({query, variables = null, action}) {
  variables = resolveMayBeFn(variables);
  return graphql(query, variables)
    .then(data => {
      resolveMayBeArray(action, function (action) {
        action = resolveMayBeFn(action, actions);
        if (data.errors) {
          store.dispatch(actions.cellar.handleErrors(data.errors));
        } else {
          store.dispatch(action(data.data));
        }
      });
    });
}

// execute function and then return result
// or return origin value
function resolveMayBeFn(fn, ...args) {
  return typeof fn === 'function' ? fn(...args) : fn;
}

function resolveMayBeArray(array, fn) {
  if (!Array.isArray(array)) array = [array];
  array.forEach(item => fn(item));
}
