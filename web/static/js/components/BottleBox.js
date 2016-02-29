import React, { PropTypes } from 'react';
import Gql from 'react-gql';
import { browserHistory } from 'react-router';
import classNames from 'classnames';
import { bottleFragment } from '../fields';
import { ProgressBar } from './';

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

  renderNotes(notes) {
    if (!notes) return;
    return (
      <p>
        <span className="icon is-small"><i className="fa fa-pencil" /></span> {notes}
      </p>
    );
  }

  render() {
    const { bottle } = this.props;
    const colorClass = classNames({
      label: true,
      'pull-right': true,
      'is-red-wine': bottle.wine.color === 'red',
      'is-rose-wine': bottle.wine.color === 'rose',
      'is-white-wine': bottle.wine.color === 'white',
    });
    return (
      <div className="card" onClick={::this.goToBottle(bottle.id)}>
        <div className="card-top is-grey font-weight-bold">
          <h3>{bottle.wine.name}</h3>
        </div>
        <div className="card-block">
          <span className={colorClass} title={bottle.wine.color}>&nbsp;&nbsp;</span>
          <p className="card-text">
            <span title="Designation">{bottle.wine.designation}</span> <span title="Vintage">{bottle.wine.vintage}</span>
          </p>
          <div className="row">
            <div className="col-xs-6">
              <i className="fa fa-clock-o" /> {bottle.wine.ready_to_drink}
            </div>
            <div className="col-xs-6">
              <ProgressBar wine={bottle.wine} />
            </div>
          </div>
          <p>
            <a href="#" className="btn btn-primary-outline btn-sm">
              <i className="fa fa-glass" /> Drink
            </a>&nbsp;
            <a href="#" className="btn btn-primary-outline btn-sm">
              <i className="fa fa-arrows" /> Move
            </a>
          </p>
          {::this.renderNotes(bottle.notes)}
        </div>
      </div>
    );
  }

}

export default Gql.Fragment(fragmentConfig)(BottleBox);
