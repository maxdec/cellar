import React, { PropTypes } from 'react';
import Gql from 'react-gql';
import { bottleDisplayFields, bottleFragment, read } from '../fields';

const fragmentConfig = {
  fragment: bottleFragment
};

class BottleRow extends React.Component {
  static propTypes = {
    bottle: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  render() {
    const { bottle } = this.props;
    return (
      <tr onClick={goToBottle(bottle.id, this.context.router)} className="is-clickable">
        {bottleDisplayFields.map(field => <td key={field}>{read(bottle, field)}</td>)}
      </tr>
    );
  }

}

export default Gql.Fragment(fragmentConfig)(BottleRow);

/**
 * Private helpers
 */
function goToBottle(bottleId, router) {
  return (event) => {
    event.preventDefault();
    router.push(`/bottles/${bottleId}`);
  };
}
