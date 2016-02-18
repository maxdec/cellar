import wines from './wines';
import bottles from './bottles';

export default {
  name: 'cellar',
  defaultState: {
    wines: [],
    selectedWineIndex: null,
    bottles: [],
    selectedBottleIndex: null,
  },
  mutations: {
    ...wines,
    ...bottles,
  }
};
