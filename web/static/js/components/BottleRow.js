import React, { PropTypes } from 'react';
import Gql from 'react-gql';
import { browserHistory } from 'react-router';
import { bottleDisplayFields, bottleFragment, read } from '../fields';

const fragmentConfig = {
  fragment: bottleFragment
};

class BottleRow extends React.Component {
  static propTypes = {
    bottle: PropTypes.object.isRequired
  };

  goToBottle(bottleId) {
    return (event) => {
      event.preventDefault();
      browserHistory.push(`/bottles/${bottleId}`);
    };
  }

  render() {
    const { bottle } = this.props;
    return (
      <tr onClick={::this.goToBottle(bottle.id)} className="is-clickable">
        {bottleDisplayFields.map(field => <td key={field}>{read(bottle, field)}</td>)}
      </tr>
    );
  }

}

export default Gql.Fragment(fragmentConfig)(BottleRow);
