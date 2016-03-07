import fetch from 'isomorphic-fetch';
import Gql from 'react-gql';
import { actions, store } from './store';

Gql.set({
  store,
  fetchAndDispatch,
  logger: true,
});

// custom communication strategy
function fetchAndDispatch({query, variables = null, action}) {
  variables = resolveMayBeFn(variables);
  return fetch('/graphql', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query, variables
    }),
  }).then(res => {
    return res.json().then(data => {
      resolveMayBeArray(action, function (action) {
        action = resolveMayBeFn(action, actions);
        if (data.errors) {
          store.dispatch(actions.cellar.handleErrors(data.errors));
        } else {
          store.dispatch(action(data.data));
        }
      });
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
