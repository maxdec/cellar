import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default ({ children }) => {
  return (
    <div>
      <Header />
      <section className="section">
        <div className="container">
          {children}
        </div>
      </section>
      <Footer />
    </div>
  );
};
