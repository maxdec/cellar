import React from 'react';
import { IndexLink, Link } from 'react-router';

const Header = () => (
  <header className="header">
    <div className="container">
      <div className="header-left">
        <IndexLink to="/" className="header-tab" activeClassName="is-active">Cellar</IndexLink>
        <Link to="/bottles" className="header-tab" activeClassName="is-active">Bottles</Link>
        <Link to="/wines" className="header-tab" activeClassName="is-active">Wines</Link>
      </div>
    </div>
  </header>
);

export default Header;
