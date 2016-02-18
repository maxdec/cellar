import React, { Component } from 'react';
import Gql from 'react-gql';
import { actions } from '../store';
import { BottlesList } from '../components';

const config = {
  getState: state => ({
    bottles: state.cellar.bottles
  }),
  init: {
    query: `
      query bottlesQuery {
        bottles {
          id
          wine {
            id
            name
          }
        }
      }
    `,
    action: [actions.cellar.loadWines],
  }
};

class Bottles extends Component {
  render() {
    return (
      <BottlesList wines={this.props.bottles} />
    );
  }
}

export default Gql.Root(config)(Bottles);
