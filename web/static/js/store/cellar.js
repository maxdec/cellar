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
        return Object.assign({}, state, {
          rows: rows
        });
      };
    },
  }
};
