import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default ({ children }) => {
  return (
    <div className="container">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
