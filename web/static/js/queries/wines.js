import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    wines: () => Relay.QL`query { wines }`,
  };
  static routeName = 'WinesQuery';
}
