import React, { Component } from 'react';
import Gql from 'react-gql';
import { BottleForm } from '../components';
import { bottleFragment, wineFragment } from '../fields';

const config = {
  getState: state => ({
    errors: state.cellar.lastErrors,
    wines: state.cellar.wines,
  }),
  init: {
    query: `
      query winesQuery {
        wines {
          ...wine
        }
      }
      ${wineFragment}
    `,
    action: actions => actions.cellar.getWines,
  },
  mutations: {
    create: {
      query: `
        mutation createBottle($wine: ID!, $acquisition: Date!, $degustation: Date, $row: Int!, $col: Int!, $notes: String){
          bottle: createBottle(
            wineId: $wine,
            acquisition: $acquisition,
            degustation: $degustation,
            row: $row,
            col: $col,
            notes: $notes,
          ) {
            ...bottle
          }
        }
        ${bottleFragment}
      `,
      action: actions => [actions.cellar.createBottle, actions.cellar.selectBottle]
    }
  }
};

class BottleNew extends Component {
  submit(changset) {
    this.props.mutations.create(changset);
    // browserHistory.push('/bottles');
  }

  render() {
    const { errors, wines } = this.props;
    return (
      <div>
        <h2>Bottle</h2>
        <BottleForm errors={errors} wines={wines} submit={::this.submit} />
      </div>
    );
  }
}

export default Gql.Root(config)(BottleNew);
