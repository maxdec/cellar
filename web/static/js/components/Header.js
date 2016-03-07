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

      <div className="input-group input-group-sm pull-xs-right">
        <span className="input-group-addon"><i className="fa fa-search" /></span>
        <input className="form-control" type="text" placeholder="Search" />
      </div>
    </nav>
  </header>
);

export default Header;
