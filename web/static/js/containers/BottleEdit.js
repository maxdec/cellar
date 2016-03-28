import React, { Component } from 'react';
import Gql from 'react-gql';
import { BottleForm } from '../components';
import { bottleFragment } from '../fields';

const config = {
  getState: state => ({
    bottle: state.cellar.bottles[state.cellar.selectedBottleIndex],
    errors: state.cellar.lastErrors,
  }),
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
        mutation updateBottle($id: ID!, $wine: ID, $acquisition: Date, $degustation: Date, $row: Int, $col: Int, $notes: String){
          bottle: updateBottle(
            id: $id,
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
      action: actions => actions.cellar.selectBottle
    }
  }
};

class BottleEdit extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    const { id } = this.props.params;
    this.props.mutations.loadBottle({ id: id });
  }

  submit(changset) {
    this.props.mutations.update(changset);
    this.context.router.push('/bottles');
  }

  render() {
    const { bottle, errors } = this.props;
    return (
      <div>
        <h2>Bottle</h2>
        <BottleForm bottle={bottle} errors={errors} submit={::this.submit} />
      </div>
    );
  }
}

export default Gql.Root(config)(BottleEdit);
