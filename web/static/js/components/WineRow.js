import React, { PropTypes } from 'react';
import Gql from 'react-gql';
import { wineDisplayFields, wineFragment } from '../fields';

const fragmentConfig = {
  fragment: wineFragment
};

class WineRow extends React.Component {
  static propTypes = {
    wine: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };


  render() {
    const { wine } = this.props;
    return (
      <tr onClick={goToWine(wine.id, this.context.router)} className="is-clickable">
        {wineDisplayFields.map(field => <td key={field}>{wine[field]}</td>)}
      </tr>
    );
  }

}

export default Gql.Fragment(fragmentConfig)(WineRow);

/**
 * Private helpers
 */
function goToWine(wineId, router) {
  return (event) => {
    event.preventDefault();
    router.push(`/wines/${wineId}`);
  };
}
