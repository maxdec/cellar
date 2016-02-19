import React, { Component } from 'react';
import Gql from 'react-gql';
import { BottleRow, TableHead } from '../components';
import { bottleFields } from '../fields';

const config = {
  getState: state => ({
    bottles: state.cellar.bottles
  }),
  init: {
    query: `
      query bottlesQuery {
        bottles {
          ${BottleRow.getFragment()}
        }
      }
    `,
    action: actions => actions.cellar.getBottles,
  }
};

class Bottles extends Component {
  render() {
    return (
      <table className="table table-hover">
        <TableHead fields={bottleFields} key="thead" />
        <tbody key="tbody">
          {this.props.bottles.map(bottle => <BottleRow bottle={bottle} key={bottle.id} />)}
        </tbody>
      </table>
    );
  }
}

export default Gql.Root(config)(Bottles);
