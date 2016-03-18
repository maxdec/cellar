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
    return rows.map((row, r) => {
      return (
        <div className="card-group" key={r}>
          <div className="cellar-row-header is-full-centered" key="header">{r}</div>
          {::this.renderBoxes(row, r)}
        </div>
      );
    });
  }

  renderBoxes(bottles, r) {
    return bottles.map((bottle, c) => ::this.renderBox(bottle, r, c));
  }

  renderBox(bottle, row, col) {
    return bottle.id ? <BottleBox bottle={bottle} key={col} /> : <EmptyBox key={col} row={row} col={col} />;
  }

  renderHeader(rows) {
    return (
      <div className="card-group">
        {rows[0].map((_, index) => (<div className="card cellar-header is-full-centered" key={index}>{index}</div>))}
      </div>
    );
  }

  render() {
    const { rows } = this.props;
    if (rows.length === 0) return(<div />);

    return (
      <div>
        {::this.renderHeader(rows)}
        {::this.renderRows(rows)}
      </div>
    );
  }
}

export default Gql.Root(config)(Cellar);
