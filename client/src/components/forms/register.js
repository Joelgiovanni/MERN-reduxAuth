import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
  }

  // Redirect to dashboard if a user is logged in. Will not allow access to this component if already logged in
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  // Will check for errors in the props that will be recieved. Will set the errors to the errors object in state and render them on the UI
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // Axios call in reducer
    this.props.registerUser(userData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    // Conditional rendering to add a invalid class to form if we have errors
    const { errors } = this.state;

    return (
      <div className='container'>
        <h1 className='display-4 text-center'> Register </h1>
        <form onSubmit={this.onSubmit} noValidate>
          <div className='form-group'>
            <label>Name</label>
            <input
              type='name'
              name='name'
              className={classnames('form-control', {
                'is-invalid': errors.name
              })}
              onChange={this.onChange}
              value={this.state.name}
              placeholder='Enter name'
            />
            {/* Conditionaly rendering a error message if it exists */}
            {errors.name && (
              <div className='invalid-feedback'> {errors.name} </div>
            )}
          </div>
          <div className='form-group'>
            <label>Email address</label>
            <input
              type='email'
              name='email'
              onChange={this.onChange}
              value={this.state.email}
              className={classnames('form-control', {
                'is-invalid': errors.email
              })}
              placeholder='Enter email'
            />
            {/* Conditionaly rendering a error message if it exists */}
            {errors.email && (
              <div className='invalid-feedback'> {errors.email} </div>
            )}
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              onChange={this.onChange}
              value={this.state.password}
              className={classnames('form-control', {
                'is-invalid': errors.password
              })}
              placeholder='Password'
            />
            {/* Conditionaly rendering a error message if it exists */}
            {errors.password && (
              <div className='invalid-feedback'> {errors.password} </div>
            )}
          </div>
          <div className='form-group'>
            <label>Verify Password</label>
            <input
              type='password'
              name='password2'
              onChange={this.onChange}
              value={this.state.password2}
              className={classnames('form-control', {
                'is-invalid': errors.password2
              })}
              placeholder='Verify password'
            />
            {/* Conditionaly rendering a error message if it exists */}
            {errors.password2 && (
              <div className='invalid-feedback'> {errors.password2} </div>
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

// Setting up Redux
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
// WithRouter will pass updated match, location, and history props to the wrapped component whenever it renders.

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
