import React, { Component } from 'react';
import Gql from 'react-gql';
import { BottleBox, EmptyBox } from '../components';

const config = {
  getState: state => ({
    rows: state.cellar.rows
  }),
  init: {
    query: `
      query cellarQuery {
        rows {
          ${BottleBox.getFragment()}
        }
      }
    `,
    action: actions => actions.cellar.getRows
  }
};

class Cellar extends Component {
  renderRows(rows) {
    return rows.map((row, i) => {
      return (
        <div className="columns" key={i}>
          {::this.renderBoxes(row)}
        </div>
      );
    });
  }

  renderBoxes(bottles) {
    return bottles.map((bottle, i) => {
      return (
        <div className="column is-quarter" key={i}>
          {::this.renderBox(bottle)}
        </div>
      );
    });
  }

  renderBox(bottle) {
    return bottle.id ? <BottleBox bottle={bottle} /> : <EmptyBox />;
  }

  render() {
    const { rows } = this.props;
    if (rows.length === 0) return(<div />);

    return (
      <div>
        {::this.renderRows(rows)}
      </div>
    );
  }
}

export default Gql.Root(config)(Cellar);
