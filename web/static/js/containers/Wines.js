import React, { Component } from 'react';
import Gql from 'react-gql';
import { TableHead, WineRow } from '../components';
import { wineFields } from '../fields';

const config = {
  getState: state => ({
    wines: state.cellar.wines
  }),
  init: {
    query: `
      query winesQuery {
        wines {
          ${WineRow.getFragment()}
        }
      }
    `,
    action: actions => actions.cellar.getWines,
  }
};

class Wines extends Component {
  render() {
    return (
      <table className="table table-hover">
        <TableHead fields={wineFields} key="thead" />
        <tbody key="tbody">
          {this.props.wines.map(wine => <WineRow wine={wine} key={wine.id} />)}
        </tbody>
      </table>
    );
  }
}

export default Gql.Root(config)(Wines);
