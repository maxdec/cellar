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
  getWinesForSearch: function *() {
    yield type => {
      return ({wines}) => ({type, wines});
    };
    yield (state, {wines}) => {
      return Object.assign({}, state, {
        searchedWines: wines
      });
    };
  },
  selectWine: function *() {
    yield type => {
      return ({wine}) => ({type, wine});
    };
    yield (state, {wine}) => {
      let wineIndex = state.wines.findIndex(w => w.id === wine.id);
      if (wineIndex === -1) wineIndex = state.wines.length;

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
  resetSelectedWine: function *() {
    yield type => {
      return () => ({type});
    };
    yield (state) => {
      return Object.assign({}, state, {
        selectedWineIndex: null
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
