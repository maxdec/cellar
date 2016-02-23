import React from 'react';
import { browserHistory } from 'react-router';

export default class EmptyBox extends React.Component {

  goToNewBottle(event) {
    event.preventDefault();
    browserHistory.push(`/bottles/new`);
  }

  render() {
    return (
      <div className="card is-clickable is-disabled" onClick={::this.goToNewBottle}>
        <div className="card-content">
          <div className="content">
            <p>
              <a href="#" className="button"><i className="fa fa-plus" /> Add</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

}
