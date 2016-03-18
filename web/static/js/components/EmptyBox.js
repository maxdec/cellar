import React from 'react';
import { browserHistory } from 'react-router';

export default class EmptyBox extends React.Component {
  static propTypes = {
    row: React.PropTypes.number,
    col: React.PropTypes.number,
  };

  goToNewBottle(event) {
    event.preventDefault();
    browserHistory.push(`/bottles/new?row=${this.props.row}&col=${this.props.col}`);
  }

  render() {
    return (
      <div className="card cellar-box is-clickable is-disabled is-full-centered" onClick={::this.goToNewBottle}>
        <span><i className="fa fa-plus" /> Add</span>
      </div>
    );
  }

}
