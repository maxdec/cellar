import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, IndexRoute } from 'react-router';
import { addBottle, drinkBottle } from '../actions';
import { BottleForm, BottlesList } from '../components';

class Bottles extends Component {
  render() {
    const { bottles } = this.props;
    return (
      <div>
        <IndexRoute component={BottlesList} bottles={bottles} />
        <Route path="new" component={BottleForm} />
        <Route path="edit/:id" component={BottleForm} />
      </div>
    );
  }
}

// Select and return the props from global state that are required by this component
function mapStateToProps(state) {
  return {
    bottles: state.bottles,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addBottle: (bottle) => dispatch(addBottle(bottle)),
    drinkBottle: (index) => dispatch(drinkBottle(index)),
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Bottles);
