import React, { Component } from 'react';
import Gql from 'react-gql';
import { WineForm } from '../components';
import { wineFragment } from '../fields';

const config = {
  getState: state => ({
    wine: state.cellar.wines[state.cellar.selectedWineIndex],
    errors: state.cellar.lastErrors
  }),
  mutations: {
    loadWine: {
      query: `
        query wineQuery($id: ID!) {
          wine(id: $id) {
            ...wine
          }
        }
        ${wineFragment}
      `,
      action: actions => actions.cellar.selectWine,
    },
    edit: {
      query: `
        mutation updateWine($id: ID!, $name: String, $designation: String, $vintage: Int, $readyToDrink: String, $color: String, $notes: String){
          wine: updateWine(
            id: $id,
            name: $name,
            designation: $designation,
            vintage: $vintage,
            readyToDrink: $readyToDrink,
            color: $color,
            notes: $notes,
          ) {
            ...wine
          }
        }
        ${wineFragment}
      `,
      action: actions => actions.cellar.selectWine
    },
  }
};

class WineEdit extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    const { id } = this.props.params;
    this.props.mutations.loadWine({ id: id });
  }

  submit(changeset) {
    this.props.mutations.edit(changeset);
    this.context.router.goBack();
  }

  render() {
    const { wine, errors } = this.props;
    return (
      <div>
        <h2>Wine</h2>
        <WineForm wine={wine} errors={errors} submit={::this.submit} />
      </div>
    );
  }
}

export default Gql.Root(config)(WineEdit);
