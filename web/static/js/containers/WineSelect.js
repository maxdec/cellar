import React, { Component } from 'react';
import Gql from 'react-gql';
import classNames from 'classnames';
import listensToClickOutside from 'react-onclickoutside/decorator';
import { wineFragment } from '../fields';
import { ColorLabel } from '../components';

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const config = {
  getState: state => ({
    wines: state.cellar.searchedWines
  }),
  mutations: {
    search: {
      query: `
        query searchWines($q: String!) {
          wines(q: $q) {
            ...wine
          }
        }
        ${wineFragment}
      `,
      action: actions => actions.cellar.getWinesForSearch,
    }
  }
};

class WineSelect extends Component {
  static propTypes = {
    wine: React.PropTypes.object,
    onSelect: React.PropTypes.func,
    onReset: React.PropTypes.func,
    className: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      displayOptions: false,
      input: '',
    };

    this.searchWinesDebounced = debounce(() => {
      this.searchWines();
    }, 500);
  }

  searchWines() {
    const { input } = this.state;
    if (!input) return;
    this.props.mutations.search({ q: input });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      ...this.state,
      input: event.target.value,
    });
    this.searchWinesDebounced();
  }

  handleSelect(wine) {
    return (event) =>{
      event.preventDefault();
      this.setState({
        ...this.state,
        input: wine.name,
      });
      this.props.onSelect(wine);
    };
  }

  handleClearSelection() {
    if (this.props.onReset) this.props.onReset();
  }

  handleFocusInput() {
    this.setState({
      ...this.state,
      displayOptions: true,
    });
  }

  handleClickOutside() {
    this.setState({
      ...this.state,
      displayOptions: false,
    });
  }

  handleKeyPress(index) {
    return (event) => {
      let newIndex;
      switch (event.key) {
        case 'ArrowDown':
          newIndex = index + 1;
          break;
        case 'ArrowUp':
          newIndex = index - 1;
          break;
      }

      const ref = this.refs[`option${newIndex}`];
      if (ref) ref.focus();
    };
  }

  renderOptions() {
    const { wines } = this.props;
    if (!this.state.input) return;
    return (
      <div className="dropdown-menu is-full-width">
        {wines.map(::this.renderOption)}
      </div>
    );
  }

  renderOption(wine, index) {
    return (
      <a href
        className="dropdown-item"
        key={wine.id}
        onClick={::this.handleSelect(wine)}
        onKeyDown={::this.handleKeyPress(index)}
        ref={`option${index}`}
      >
        <ColorLabel color={wine.color} className="pull-right" />
        {wine.name} {wine.vintage}
      </a>
    );
  }

  renderSelection(wine) {
    return(
      <div>
        <div className="btn-group btn-group-sm">
          <a className="btn btn-secondary disabled"><ColorLabel color={wine.color} className="pull-right" /> {wine.name} {wine.vintage}</a>
          <button className="btn btn-secondary" onClick={::this.handleClearSelection}>&times;</button>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.wine) {
      return this.renderSelection(this.props.wine);
    }

    const classDropdown = classNames({
      dropdown: true,
      open: this.state.displayOptions,
    });

    return (
      <div className={classDropdown}>
        <input
          type="text"
          name="wine"
          value={this.state.input}
          onChange={::this.handleChange}
          placeholder="Search for a Wine..."
          className={this.props.className}
          onFocus={::this.handleFocusInput}
          onKeyDown={::this.handleKeyPress(-1)}
          ref="option-1"
          autoComplete="off"
        />
        {::this.renderOptions()}
      </div>
    );
  }
}

export default Gql.Root(config)(listensToClickOutside(WineSelect));
