import React, { Component } from 'react';
import { actions, store } from '../store';
import Gql from 'react-gql';

const config = {
  getState: state => ({
    errors: state.cellar.lastErrors
  })
};
class Alerts extends Component {
  handleDiscard(index) {
    return (event) => {
      event.preventDefault();
      store.dispatch(actions.cellar.discardError(index));
    };
  }

  render() {
    const { errors } = this.props;
    if (!errors || errors.length === 0) return (<div></div>);

    return (
      <div>
        {errors.map((err, i) => (
          <div className="alert alert-danger" role="alert" key={i}>
            <a className="close pull-xs-right" onClick={::this.handleDiscard(i)}>&times;</a>
            <strong>Error!</strong> {err.message}
          </div>
        ))}
      </div>
    );
  }
}

export default Gql.Root(config)(Alerts);
