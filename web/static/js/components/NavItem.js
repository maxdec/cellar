import React from 'react';
import { IndexLink, Link } from 'react-router';
import classNames from 'classnames';

class NavItem extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  render() {
    const isActive = this.context.router.isActive(this.props.to, this.props.index);
    console.log(this.props.to, this.props.index, isActive);
    const liClass = classNames({
      'nav-item': true,
      'active': isActive,
    });

    const link = this.props.index
      ? <IndexLink className="nav-link" to={this.props.to}>{this.props.children}</IndexLink>
      : <Link className="nav-link" to={this.props.to}>{this.props.children}</Link>;

    return (
      <li className={liClass}>
        {link}
      </li>
    );
  }
}

export default NavItem;
