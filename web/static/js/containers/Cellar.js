import React, { Component } from 'react';
import Gql from 'react-gql';
import Modal from 'react-modal';
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

  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false };
  }

  openModal(bottleId) {
    this.setState({
      modalIsOpen: true,
      bottleId: bottleId
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      bottleId: null
    });
  }

  handleModalCloseRequest() {
    this.closeModal();
  }

  handleMoveRequest(event) {
    event.preventDefault();
    console.log('Save button was clicked', event);
  }

  handleMoveClicked(bottleId) {
    console.log('CLICKED', bottleId);
    this.openModal(bottleId);
  }

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
    return (bottle && bottle.id) ? <BottleBox bottle={bottle} key={col} onMove={::this.handleMoveClicked}/> : <EmptyBox key={col} row={row} col={col} />;
  }

  renderHeader(rows) {
    return (
      <div className="card-group">
        {rows[0].map((_, index) => (<div className="card cellar-header is-full-centered" key={index}>{index}</div>))}
      </div>
    );
  }

  renderMoveModal() {
    return (
      <Modal
          className="Modal__Bootstrap modal"
          isOpen={this.state.modalIsOpen}
          onRequestClose={::this.handleModalCloseRequest}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={::this.handleMoveRequest}>
              <div className="modal-header">
                <button type="button" className="close" onClick={::this.handleModalCloseRequest}>
                  <span aria-hidden="true">&times;</span>
                  <span className="sr-only">Close</span>
                </button>
                <h4 className="modal-title">Modal title</h4>
              </div>
              <div className="modal-body">

                  <input type="text" name="col" />
                  <input type="text" name="row" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={::this.handleModalCloseRequest}>Close</button>
                <button type="submit" className="btn btn-primary" onClick={::this.handleMoveRequest}>Save changes</button>
              </div>
              </form>
            </div>
          </div>
        </Modal>
    );
  }

  render() {
    const { rows } = this.props;
    if (rows.length === 0) return(<div />);

    return (
      <div>
        {::this.renderHeader(rows)}
        {::this.renderRows(rows)}
        {::this.renderMoveModal()}
      </div>
    );
  }
}

export default Gql.Root(config)(Cellar);
