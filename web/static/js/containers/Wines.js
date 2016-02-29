import React, { Component } from 'react';
import Gql from 'react-gql';
import { Link } from 'react-router';
import { TableHead, WineRow } from '../components';
import { wineDisplayFields } from '../fields';

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
      <div>
        <div className="pull-xs-right">
          <Link to="/wines/new" className="btn btn-primary-outline">
            <i className="fa fa-plus" /> Add
          </Link>
        </div>
        <h2>Wines</h2>
        <table className="table table-hover">
          <TableHead fields={wineDisplayFields} key="thead" />
          <tbody key="tbody">
            {this.props.wines.map(wine => <WineRow wine={wine} key={wine.id} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Gql.Root(config)(Wines);
