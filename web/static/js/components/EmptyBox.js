import React from 'react';
import { browserHistory } from 'react-router';

export default class EmptyBox extends React.Component {

  goToNewBottle(event) {
    event.preventDefault();
    browserHistory.push(`/bottles/new`);
  }

  render() {
    return (
      <div className="thumbnail box disabled" onClick={::this.goToNewBottle}>
        <div className="caption">
          <p>
            <a href="#" className="btn btn-default"><i className="glyphicon glyphicon-plus" /> Add</a>
          </p>
        </div>
      </div>
    );
  }

}
