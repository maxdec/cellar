export default {
  loadBottles: function *() {
    yield type => {
      return ({bottles}) => ({type, bottles});
    };
    yield (state, {bottles}) => {
      return Object.assign({}, state, {
        bottles: bottles
      });
    };
  },
};
