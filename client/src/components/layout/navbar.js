import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';

class Navbar extends Component {
  // Action to logout user, destroy token & set isAuthenticated === false
  logout = e => {
    e.preventDefault();

    this.props.logoutUser();
    this.props.history.push('/');
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    // Links that will show on navbar when a user is notAuthenticated
    const notLoggedIn = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/register'>
            Sign Up
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </li>
      </ul>
    );

    // Links that will show on navbar when a user isAuthenticated
    const loggedIn = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/dashboard'>
            Dashboard
          </Link>
        </li>
        <li className='nav-item'>
          <Link onClick={this.logout} className='nav-link' to='/'>
            Logout
          </Link>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
          <div className='container'>
            <Link className='navbar-brand' to='/'>
              || ||
            </Link>
            <button
              className='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#mobile-nav'
            >
              <span className='navbar-toggler-icon' />
            </button>

            <div className='collapse navbar-collapse' id='mobile-nav'>
              {isAuthenticated ? loggedIn : notLoggedIn}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
