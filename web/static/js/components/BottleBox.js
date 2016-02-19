import React, { PropTypes } from 'react';
import Gql from 'react-gql';
import { browserHistory } from 'react-router';
import { bottleFields } from '../fields';

const fragmentConfig = {
  fragment: `
    fragment bottle on Bottle {
      ${bottleFields.join(', ')}
    }
  `
};

class BottleBox extends React.Component {
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
      <a href className="thumbnail" onClick={::this.goToBottle(bottle.id)} style={{height: '80px'}}>
        {bottle.id}
      </a>
    );
  }

}

export default Gql.Fragment(fragmentConfig)(BottleBox);
