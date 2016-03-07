import React from 'react';
import { Footer, Header } from '../components';
import { Alerts } from './';

export default ({ children }) => {
  return (
    <div className="container">
      <Header />
      <Alerts />
      {children}
      <Footer />
    </div>
  );
};
