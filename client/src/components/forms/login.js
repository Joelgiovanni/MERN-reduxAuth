import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  // Redirect to dashboard if a user is logged in. Will not allow access to this component if already logged in
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  // Instructions on what the component should do when new props are brought in, what to do with them & how to handle them
  componentWillReceiveProps(nextProps) {
    // Rdirect to dashboard if logged in is a succcess
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (this.props.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className='container'>
        <h1 className='display-4 text-center'> Login </h1>
        <form onSubmit={this.onSubmit} noValidate>
          <div className='form-group'>
            <label>Login</label>
            <input
              type='email'
              name='email'
              className={classnames('form-control', {
                'is-invalid': errors.email
              })}
              placeholder='Enter email'
              value={this.state.email}
              onChange={this.onChange}
            />
            {errors.email && (
              <div className='invalid-feedback'> {errors.email} </div>
            )}
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              className={classnames('form-control', {
                'is-invalid': errors.password
              })}
              placeholder='Password'
              value={this.state.password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className='invalid-feedback'> {errors.password} </div>
            )}
          </div>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
