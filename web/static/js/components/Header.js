import React from 'react';
import { IndexLink, Link } from 'react-router';

const Header = () => (
  <header>
    <ul className="nav nav-tabs">
      <li role="presentation">
        <IndexLink to="/" className="btn btn-default" activeClassName="active">Cellar</IndexLink>
      </li>
      <li role="presentation">
        <Link to="/bottles" className="btn btn-default" activeClassName="active">Bottles</Link>
      </li>
      <li role="presentation">
        <Link to="/wines" className="btn btn-default" activeClassName="active">Wines</Link>
      </li>
    </ul>
  </header>
);

export default Header;
