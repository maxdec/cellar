import React, { Component } from 'react';
import Gql from 'react-gql';
import { BottleFull } from '../components';

const config = {
  getState: state => ({
    bottle: state.cellar.bottles[state.cellar.selectedBottleIndex]
  }),
  mutations: {
    loadBottle: {
      query: `
        query bottleQuery($id: ID!) {
          bottle(id: $id) {
            ${BottleFull.getFragment()}
          }
        }
      `,
      action: actions => actions.cellar.selectBottle,
    }
  }
};

class Bottle extends Component {
  componentDidMount() {
    const { id } = this.props.params;
    if (id != 'new') this.props.mutations.loadBottle({ id: id });
  }

  render() {
    const { id } = this.props.params;
    const bottle = id === 'new' ? {id: 'new'} : this.props.bottle;

    return (<BottleFull bottle={bottle} />);
  }
}

export default Gql.Root(config)(Bottle);
