import update from 'react-addons-update';
import wines from './wines';
import bottles from './bottles';

export default {
  name: 'cellar',
  defaultState: {
    rows: [],
    wines: [],
    selectedWineIndex: null,
    bottles: [],
    selectedBottleIndex: null,
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
  }
};
