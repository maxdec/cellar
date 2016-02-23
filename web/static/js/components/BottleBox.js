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
      tag: true,
      'is-pulled-right': true,
      'is-red-wine': bottle.wine.color === 'red',
      'is-rose-wine': bottle.wine.color === 'rose',
      'is-white-wine': bottle.wine.color === 'white',
    });
    return (
      <div className="card is-clickable" onClick={::this.goToBottle(bottle.id)}>
        <div className="card-image is-10x2 is-grey">
          <h3 className="title is-3 is-bold">{bottle.wine.name}</h3>
        </div>
        <div className="card-content">
          <div className="content">
            <span className={colorClass} title={bottle.wine.color}></span>
            <p>
              <span title="Designation">{bottle.wine.designation}</span> <span title="Vintage">{bottle.wine.vintage}</span>
            </p>
            <div className="columns is-gapless">
              <div className="column is-4">
                <i className="fa fa-clock-o" /> {bottle.wine.ready_to_drink}
              </div>
              <div className="column">
                <ProgressBar wine={bottle.wine} />
              </div>
            </div>
            <p>
              <a href="#" className="button is-outlined">
                <i className="fa fa-glass" /> Drink
              </a>&nbsp;
              <a href="#" className="button is-outlined">
                <i className="fa fa-arrows" /> Move
              </a>
            </p>
            {::this.renderNotes(bottle.notes)}
          </div>
        </div>
      </div>
    );
  }

}

export default Gql.Fragment(fragmentConfig)(BottleBox);
