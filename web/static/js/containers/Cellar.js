import React, { Component } from 'react';
import Gql from 'react-gql';
import { BottleBox } from '../components';

const config = {
  getState: state => ({
    bottles: state.cellar.bottles
  }),
  init: {
    query: `
      query bottlesQuery {
        bottles {
          ${BottleBox.getFragment()}
        }
      }
    `,
    action: actions => actions.cellar.getBottles
  }
};

class Cellar extends Component {
  renderBoxes() {
    return this.props.bottles.map(bottle => <BottleBox key={bottle.id} bottle={bottle} />);
  }

  render() {
    if (this.props.bottles.length === 0) return(<div />);
    return (
      <div className="row">
        <div className="col-xs-6 col-md-3">
          {::this.renderBoxes()}
        </div>
      </div>
    );
  }
}

export default Gql.Root(config)(Cellar);
