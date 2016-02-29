import React, { Component } from 'react';
import Gql from 'react-gql';
import { Link } from 'react-router';
import { BottleRow, TableHead } from '../components';
import { bottleDisplayFields } from '../fields';

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
      <div>
        <div className="pull-xs-right">
          <Link to="/bottles/new" className="btn btn-primary-outline">
            <i className="fa fa-plus" /> Add
          </Link>
        </div>
        <h2>Bottles</h2>
        <table className="table table-hover">
          <TableHead fields={bottleDisplayFields} key="thead" />
          <tbody key="tbody">
            {this.props.bottles.map(bottle => <BottleRow bottle={bottle} key={bottle.id} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Gql.Root(config)(Bottles);
