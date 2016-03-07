import React, { Component } from 'react';
import Gql from 'react-gql';
import { BottleForm } from '../components';
import { bottleFragment, wineFragment } from '../fields';

const config = {
  getState: state => ({
    bottle: state.cellar.bottles[state.cellar.selectedBottleIndex],
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
    loadBottle: {
      query: `
        query bottleQuery($id: ID!) {
          bottle(id: $id) {
            ...bottle
          }
        }
        ${bottleFragment}
      `,
      action: actions => actions.cellar.selectBottle,
    },
    update: {
      query: `
        mutation updateBottle($id: ID!, $acquisition: Date, $degustation: Date, $row: Int, $col: Int, $notes: String){
          updateBottle(
            id: $id,
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
      action: actions => actions.cellar.selectBottle
    }
  }
};

class BottleEdit extends Component {
  componentDidMount() {
    const { id } = this.props.params;
    this.props.mutations.loadBottle({ id: id });
  }

  submit(changset) {
    this.props.mutations.edit(changset);
    // browserHistory.push('/bottles');
  }

  render() {
    const { bottle, errors, wines } = this.props;
    return (
      <div>
        <h2>Bottle</h2>
        <BottleForm bottle={bottle} errors={errors} wines={wines} submit={::this.submit} />
      </div>
    );
  }
}

export default Gql.Root(config)(BottleEdit);
