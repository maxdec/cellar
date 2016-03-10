import React, { Component } from 'react';
import { Footer, Header } from '../components';
import { Alerts } from './';

export default class App extends Component {
  static childContextTypes = {
    location: React.PropTypes.object
  };

  getChildContext() {
    return { location: this.props.location };
  }

  render() {
    const { children } = this.props;

    return (
      <div className="container">
        <Header />
        <Alerts />
        {children}
        <Footer />
      </div>
    );
  }
}
