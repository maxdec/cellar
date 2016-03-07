import React, { Component } from 'react';
import Gql from 'react-gql';

const config = {
  getState: state => ({
    errors: state.cellar.lastErrors
  })
};
class Alerts extends Component {
  render() {
    const { errors } = this.props;
    console.log(errors);
    if (!errors || errors.length === 0) return (<div></div>);

    return (
      <div>
        {errors.map((err, i) => (
          <div className="alert alert-danger" role="alert" key={i}>
            <strong>Error!</strong> {err.message}
          </div>
        ))}
      </div>
    );
  }
}

export default Gql.Root(config)(Alerts);
