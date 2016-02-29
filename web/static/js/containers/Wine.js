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
      action: actions => actions.cellar.selectWine,
    }
  }
};

class Wine extends Component {
  componentDidMount() {
    const { id } = this.props.params;
    if (id != 'new') this.props.mutations.loadWine({ id: this.props.params.id });
  }

  render() {
    const { id } = this.props.params;
    const wine = id === 'new' ? {id: 'new'} : this.props.wine;

    return (<WineFull wine={wine} />);
  }
}

export default Gql.Root(config)(Wine);
