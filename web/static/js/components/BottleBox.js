import React, { PropTypes } from 'react';
import Gql from 'react-gql';
import { browserHistory } from 'react-router';
import { bottleFragment } from '../fields';

const colors = {
  red: '#800',
  rose: '#f69',
  white: '#ff9',
};

const fragmentConfig = {
  fragment: bottleFragment
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

  colorStyle(color) {
    return { color: colors[color] };
  }

  render() {
    const { bottle } = this.props;
    return (
      <div className="thumbnail clickable" onClick={::this.goToBottle(bottle.id)} style={{height: '160px'}}>
        <div className="caption">
          <h3>{bottle.wine.name} { bottle.wine.vintage }</h3>
          <p>
            <i className="glyphicon glyphicon-tint bordered" style={::this.colorStyle(bottle.wine.color)} />
            {bottle.wine.ready_to_drink}
          </p>
          <p>
            <a href="#" className="btn btn-primary">Button</a>
            <a href="#" className="btn btn-default">Button</a>
          </p>
        </div>
      </div>
    );
  }

}

export default Gql.Fragment(fragmentConfig)(BottleBox);
