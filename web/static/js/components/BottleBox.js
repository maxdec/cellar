import React, { PropTypes } from 'react';
import Gql from 'react-gql';
import { browserHistory } from 'react-router';
import { bottleFragment } from '../fields';

const colors = {
  red: '#800',
  rose: '#f69',
  white: '#ee8',
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
    return { 'background-color': colors[color] };
  }

  renderNotes(notes) {
    if (!notes) return;
    return (
      <p>
        <i className="glyphicon glyphicon-pencil" /> {notes}
      </p>
    );
  }

  render() {
    const { bottle } = this.props;
    return (
      <div className="thumbnail clickable box" onClick={::this.goToBottle(bottle.id)}>
        <h3 style={::this.colorStyle(bottle.wine.color)}>
          {bottle.wine.name}
        </h3>
        <div className="caption">
          <p>
            <span title="Designation">{bottle.wine.designation}</span> <span title="Vintage">{bottle.wine.vintage}</span>
          </p>
          <p title="Ready To Drink">
            <i className="glyphicon glyphicon-time" /> {bottle.wine.ready_to_drink}
          </p>
          <p>
            <a href="#" className="btn btn-primary"><i className="glyphicon glyphicon-glass" /> Drink</a>
          </p>
          {::this.renderNotes(bottle.notes)}
        </div>
      </div>
    );
  }

}

export default Gql.Fragment(fragmentConfig)(BottleBox);
