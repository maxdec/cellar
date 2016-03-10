import update from 'react-addons-update';
import wines from './wines';
import bottles from './bottles';

export default {
  name: 'cellar',
  defaultState: {
    rows: [],
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
    getRows: function *() {
      yield type => {
        return ({rows}) => ({type, rows});
      };
      yield (state, {rows}) => {
        return {...state, rows: rows };
      };
    },
    // Removes from Cellar only
    removeBottleFromCellar: function *() {
      yield type => {
        return ({ row, col }) => ({type, row, col});
      };
      yield (state, {row, col}) => {
        return update(state, { rows: { [row]: { $splice: [col, 1, null] }}});
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
    clearError: function *() {
      yield type => {
        return index => ({type, index});
      };
      yield (state, {index}) => {
        return update(state, { lastErrors: { $splice: [index, 1, null] }});
      };
    }
  }
};
