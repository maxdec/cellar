import React, { Component } from 'react';
import Gql from 'react-gql';
import { WineForm } from '../components';
import { wineFragment } from '../fields';

const config = {
  getState: state => ({
    errors: state.cellar.lastErrors
  }),
  mutations: {
    create: {
      query: `
        mutation createWine($name: String!, $designation: String!, $vintage: Int!, $readyToDrink: String!, $color: String!, $notes: String){
          wine: createWine(
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
      action: actions => [actions.cellar.createWine, actions.cellar.selectWine]
    }
  }
};

class WineNew extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  submit(changeset) {
    this.props.mutations.create(changeset);
    this.context.router.goBack();
  }

  render() {
    const { errors } = this.props;
    return (
      <div>
        <h2>Wine</h2>
        <WineForm errors={errors} submit={::this.submit} />
      </div>
      );
  }
}

export default Gql.Root(config)(WineNew);
