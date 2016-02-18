import React, { PropTypes } from 'react';
import Gql from 'react-gql';
import { bottleFields } from '../fields';

const fragmentConfig = {
  fragment: `
    fragment bottle on Bottle {
      ${bottleFields.join(', ')}
    }
  `
};

class BottleRow extends React.Component {
  static propTypes = {
    bottle: PropTypes.object.isRequired
  };

  render() {
    const { bottle } = this.props;
    return (
      <tr>
        {bottleFields.map(field => <td key={field}>{bottle[field]}</td>)}
      </tr>
    );
  }

}

export default Gql.Fragment(fragmentConfig)(BottleRow);
