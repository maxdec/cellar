export default {
  getWines: function *() {
    yield type => {
      return ({wines}) => ({type, wines});
    };
    yield (state, {wines}) => {
      return Object.assign({}, state, {
        wines: wines
      });
    };
  },
  selectWine: function *() {
    yield type => {
      return ({wine}) => ({type, wine});
    };
    yield (state, {wine}) => {
      const wineIndex = state.wines.findIndex(w => w.id === wine.id) || state.wines.length;
      return Object.assign({}, state, {
        wines: [
          ...state.wines.slice(0, wineIndex),
          wine,
          ...state.wines.slice(wineIndex + 1)
        ],
        selectedWineIndex: wineIndex
      });
    };
  },
  createWine: function *() {
    yield type => {
      return ({wine}) => ({type, wine});
    };
    yield (state, {wine}) => {
      return Object.assign({}, state, {
        wines: [
          ...state.wines,
          wine
        ],
        selectedWineIndex: state.wines.length
      });
    };
  },

};
