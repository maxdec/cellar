import React, { PropTypes } from 'react';
import Gql from 'react-gql';
import { browserHistory } from 'react-router';
import { wineDisplayFields, wineFragment } from '../fields';

const fragmentConfig = {
  fragment: wineFragment
};

class WineRow extends React.Component {
  static propTypes = {
    wine: PropTypes.object.isRequired
  };

  goToWine(wineId) {
    return (event) => {
      event.preventDefault();
      browserHistory.push(`/wines/${wineId}`);
    };
  }

  render() {
    const { wine } = this.props;
    return (
      <tr onClick={::this.goToWine(wine.id)} className="is-clickable">
        {wineDisplayFields.map(field => <td key={field}>{wine[field]}</td>)}
      </tr>
    );
  }

}

export default Gql.Fragment(fragmentConfig)(WineRow);
