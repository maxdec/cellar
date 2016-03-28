import validate from 'validate.js';
import fetch from 'isomorphic-fetch';

validate.extend(validate.validators.datetime, {
  parse: function(value) {
    return new Date(value).getTime();
  },
  format: function(value) {
    return new Date(value).toISOString().slice(0, 10);
  }
});

const wineConstraints = {
  name: { presence: true },
  designation: { presence: true },
  vintage: { presence: true, format: /^\d{4}$/ },
  readyToDrink: { presence: true, format: /^\d{4}(-\d{4})?$/ },
  color: { presence:true, inclusion: ['red', 'white', 'rose']},
};

const bottleConstraints = {
  // wine: { presence: true, numericality: { onlyInteger: true, greaterThan: 0 }},
  acquisition: { presence: true, date: true },
  degustation: { date: true },
  row: { presence: true, numericality: { onlyInteger: true, greaterThanOrEqualTo: 0, lessThan: 6, }},
  col: { presence: true, numericality: { onlyInteger: true, greaterThanOrEqualTo: 0, lessThan: 4, }},
  rating: { numericality: { onlyInteger: true, greaterThanOrEqualTo: 0, lessThanOrEqualTo: 5, }},
  price: { numericality: { onlyInteger: true, greaterThanOrEqualTo: 0, }},
};

export const validateWine = (wine) => (validate(wine, wineConstraints));
export const validateBottle = (bottle) => (validate(bottle, bottleConstraints));

export function graphql(query, variables) {
  return fetch('/graphql', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query, variables
    }),
  }).then(res => res.json());
}
