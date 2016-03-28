import React, { PropTypes } from 'react';
import Gql from 'react-gql';
import Linkify from 'react-linkify';
import { bottleFragment } from '../fields';
import { ColorLabel, ProgressBar } from './';

const fragmentConfig = {
  fragment: bottleFragment,
  mutations: {
    drinkBottle: {
      query: `
        mutation drinkBottle($id: ID!, $degustation: Date!){
          bottle: updateBottle(
            id: $id,
            degustation: $degustation
          ) {
            ...bottle
          }
        }
        ${bottleFragment}
      `,
      action: actions => [actions.cellar.selectBottle, actions.cellar.removeBottleFromCellar]
    }
  }
};

class BottleBox extends React.Component {
  static propTypes = {
    bottle: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  render() {
    const { bottle, mutations } = this.props;

    return (
      <div className="card cellar-box">
        <div className="card-top is-grey font-weight-bold">
          <h3 title={bottle.wine.name}>{bottle.wine.name}</h3>
        </div>
        <div className="card-block">
          <ColorLabel color={bottle.wine.color} className="pull-xs-right" />
          <p className="card-text">
            <span title="Designation">{bottle.wine.designation}</span> <span title="Vintage">{bottle.wine.vintage}</span>
          </p>
          <div className="row">
            <div className="col-xs-6">
              <ProgressBar wine={bottle.wine} />
            </div>
            <div className="col-xs-6">
              <i className="fa fa-clock-o" /> {bottle.wine.readyToDrink}
            </div>
          </div>
          <p>
            <div className="btn-group">
              <button className="btn btn-primary-outline btn-sm" onClick={handleDrink(bottle.id, mutations.drinkBottle)}>
                <i className="fa fa-glass" /> Drink
              </button>&nbsp;
              <button className="btn btn-primary-outline btn-sm" onClick={handleMove}>
                <i className="fa fa-arrows" /> Move
              </button>
              <button className="btn btn-primary-outline btn-sm" onClick={goToBottle(bottle.id, this.context.router)}>
                <i className="fa fa-pencil-square-o" /> Edit
              </button>
            </div>
          </p>
          <p>
            {renderNotes(bottle)}
          </p>
        </div>
      </div>
    );
  }
}

export default Gql.Fragment(fragmentConfig)(BottleBox);

/**
 * Private helpers
 */
function handleDrink(bottleId, drinkBottle) {
  return (event) => {
    event.preventDefault();
    const today = new Date().toISOString().slice(0, 10);
    drinkBottle({ id: bottleId, degustation: today });
  };
}

function goToBottle(bottleId, router) {
  return (event) => {
    event.preventDefault();
    router.push(`/bottles/${bottleId}`);
  };
}

function handleMove(event) {
  event.preventDefault();
  console.log('MOVE');
}

function renderNotes(bottle) {
  if (!bottle.notes && !bottle.wine.notes) return;
  return (
    <ul className="list-unstyled">
      <li><Linkify>{bottle.notes}</Linkify></li>
      <li className="text-muted"><Linkify>{bottle.wine.notes}</Linkify></li>
    </ul>
  );
}
