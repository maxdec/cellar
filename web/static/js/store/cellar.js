import update from 'react-addons-update';
import wines from './wines';
import bottles from './bottles';

export default {
  name: 'cellar',
  defaultState: {
    cellar: {
      rows: 0,
      cols: 0,
      bottles: []
    },
    wines: [],
    searchedWines: [],
    selectedWineIndex: null,
    bottles: [],
    selectedBottleIndex: null,
    lastErrors: [],
  },
  mutations: {
    ...wines,
    ...bottles,
    getCellar: function *() {
      yield type => {
        return ({cellar}) => ({type, cellar});
      };
      yield (state, {cellar}) => {
        return {...state, cellar: cellar};
      };
    },
    // Removes from Cellar only
    removeBottleFromCellar: function *() {
      yield type => {
        return ({bottle}) => ({type, bottle});
      };
      yield (state, {bottle}) => {
        const i = state.cellar.bottles.findIndex((b) => (b.id == bottle.id));
        return update(state, { cellar: { bottles: { $splice: [[i, 1]] }}});
      };
    },
    // moveBottle: function *() {
    //   yield type => {
    //     return ({ row, col, destRow, destCol } => { type, row, col, destRow, destCol });
    //   };
    //   yield (state, { row, col, destRow, destCol }) => {
    //     let newRow
    //     return Object.assign({}, state, {
    //       rows: [

    //       ]
    //     })
    //   }
    // }

    handleErrors: function *() {
      yield type => {
        return errors => ({type, errors});
      };
      yield (state, {errors}) => {
        return {...state, lastErrors: errors || []};
      };
    },
    discardError: function *() {
      yield type => {
        return index => ({type, index});
      };
      yield (state, {index}) => {
        return update(state, { lastErrors: { $splice: [[index, 1]] }});
      };
    }
  }
};
