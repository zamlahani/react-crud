import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import Icon from '../Icon';
import { createTodo } from '../../../redux/actions/action-creators';

const NavBar = ({ url, label }) => {
  const dispatch = useDispatch();
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
      style={{ width: '100%' }}
    >
      <div className="navbar-brand">
        <Link to={url} className="navbar-item is-size-3">
          <img src={logo} height={64} width={64} />
          <span>{label}</span>
        </Link>
        <div className="navbar-item">
          <button
            className="button is-primary"
            onClick={() => dispatch(createTodo())}
          >
            <Icon icon="plus" />{' '}
            <span className="is-hidden-mobile">&nbsp;Create a new task</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default NavBar;
