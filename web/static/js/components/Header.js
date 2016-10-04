import React from 'react';
import { NavItem } from './';

const Header = () => (
  <header>
    <nav className="navbar navbar-light bg-faded">
      <ul className="nav navbar-nav">
        <NavItem index={true} to="/">Cellar</NavItem>
        <NavItem to="/bottles">Bottles</NavItem>
        <NavItem to="/wines">Wines</NavItem>
      </ul>

      <form className="form-inline pull-xs-right">
        <i className="fa fa-search" />
        <input className="form-control" type="text" placeholder="Search" />
      </form>
    </nav>
  </header>
);

export default Header;
