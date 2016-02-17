import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    bottles: () => Relay.QL`query { bottles }`,
  };
  static routeName = 'BottlesQuery';
}
