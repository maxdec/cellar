export default {
  getBottles: function *() {
    yield type => {
      return ({bottles}) => ({type, bottles});
    };
    yield (state, {bottles}) => {
      return Object.assign({}, state, {
        bottles: bottles
      });
    };
  },
  selectBottle: function *() {
    yield type => {
      return ({bottle}) => ({type, bottle});
    };
    yield (state, {bottle}) => {
      let bottleIndex = state.bottles.findIndex(b => b.id === bottle.id);
      if (bottleIndex === -1) bottleIndex = state.bottles.length;

      return Object.assign({}, state, {
        bottles: [
          ...state.bottles.slice(0, bottleIndex),
          bottle,
          ...state.bottles.slice(bottleIndex + 1)
        ],
        selectedBottleIndex: bottleIndex
      });
    };
  },
  resetSelectedBottle: function *() {
    yield type => {
      return () => ({type});
    };
    yield (state) => {
      return Object.assign({}, state, {
        selectedBottleIndex: null
      });
    };
  },
  createBottle: function *() {
    yield type => {
      return ({bottle}) => ({type, bottle});
    };
    yield (state, {bottle}) => {
      return Object.assign({}, state, {
        bottles: [
          ...state.bottles,
          bottle
        ],
        selectedBottleIndex: state.bottles.length
      });
    };
  },
};
