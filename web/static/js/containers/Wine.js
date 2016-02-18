import React, { Component } from 'react';
import Gql from 'react-gql';
import { actions } from '../store';
import { WineFull } from '../components';

const config = {
  getState: state => ({
    wine: state.cellar.wines[state.cellar.selectedWine]
  }),
  init: {
    query: `
      query wineQuery {
        wine($id: ID) {
          ${WineFull.getFragment()}
        }
      }
    `,
    action: [actions.cellar.selectWine],
  }
};

class Wine extends Component {
  render() {
    return (
      <WineFull wine={this.props.wine} />
    );
  }
}

export default Gql.Root(config)(Wine);
