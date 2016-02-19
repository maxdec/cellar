import React, { Component } from 'react';
import Gql from 'react-gql';
import { WineFull } from '../components';

const config = {
  getState: state => ({
    wine: state.cellar.wines[state.cellar.selectedWineIndex]
  }),
  mutations: {
    loadWine: {
      query: `
        query wineQuery($id: ID!) {
          wine(id: $id) {
            ${WineFull.getFragment()}
          }
        }
      `,
      variables: {
        id: 1
      },
      action: actions => actions.cellar.selectWine,
    }
  }
};

class Wine extends Component {
  componentDidMount() {
    this.props.mutations.loadWine({ id: this.props.params.id });
  }

  render() {
    return (
      <WineFull wine={this.props.wine} />
    );
  }
}

export default Gql.Root(config)(Wine);
