import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, IndexRoute } from 'react-router';
import { addWine } from '../actions';
import { WineForm, WinesList } from '../components';

class Wines extends Component {
  render() {
    // Injected by connect() call:
    const { wines } = this.props;
    return (
      <div>
        <IndexRoute component={WinesList} wines={wines} />
        <Route path="new" component={WineForm} />
        <Route path="edit/:id" component={WineForm} />
      </div>

        // <AddTodo
        //   onAddClick={text =>
        //     dispatch(addTodo(text))
        //   } />
        // <TodoList
        //   todos={visibleTodos}
        //   onTodoClick={index =>
        //     dispatch(completeTodo(index))
        //   } />
        // <Footer
        //   filter={visibilityFilter}
        //   onFilterChange={nextFilter =>
        //     dispatch(setVisibilityFilter(nextFilter))
        //   } />
      // </div>
    );
  }
}

// Select and return the props from global state that are required by this component
function mapStateToProps(state) {
  return {
    wines: state.wines,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addWine: (wine) => dispatch(addWine(wine)),
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Wines);
