import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/logo.png';
import Icon from '../Icon';

const NavBar = ({ url, label }) => {
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
      style={{ width: '100%' }}
    >
      <div className="navbar-brand">
        <a href={url} className="navbar-item is-size-3">
          <img src={logo} height={64} width={64} />
          <span>{label}</span>
        </a>
      </div>
      <div className="navbar-end"></div>
    </nav>
  );
};

NavBar.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default NavBar;
