import React, { Component } from 'react';
import Gql from 'react-gql';
import { BottleForm } from '../components';
import { bottleFragment } from '../fields';

const config = {
  getState: state => ({
    errors: state.cellar.lastErrors,
  }),
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
  static contextTypes = {
    location: React.PropTypes.object.isRequired,
  };

  submit(changset) {
    this.props.mutations.create(changset);
    // browserHistory.push('/bottles');
  }

  render() {
    const { errors, location } = this.props;
    const query = location.query;
    return (
      <div>
        <h2>Bottle</h2>
        <BottleForm errors={errors} submit={::this.submit} row={query.row} col={query.col} />
      </div>
    );
  }
}

export default Gql.Root(config)(BottleNew);
