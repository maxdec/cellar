import React, { PropTypes } from 'react';
import Gql from 'react-gql';
import { wineFields } from '../fields';

const fragmentConfig = {
  fragment: `
    fragment wine on Wine {
      ${wineFields.join(', ')}
    }
  `
};

class WineRow extends React.Component {
  static propTypes = {
    wine: PropTypes.object.isRequired
  };

  render() {
    const { wine } = this.props;
    return (
      <tr>
        {wineFields.map(field => <td key={field}>{wine[field]}</td>)}
      </tr>
    );
  }

}

export default Gql.Fragment(fragmentConfig)(WineRow);
