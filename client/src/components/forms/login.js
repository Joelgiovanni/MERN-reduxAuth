import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import axios from 'axios';
import setAuthToken from '../../helpers/setAuthToken';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post('http://localhost:5000/api/login', user)
      .then(res => {
        // Save the Token to local storage
        const { token } = res.data;
        // Set the extracted token to local storage
        localStorage.setItem('jwtToken', JSON.stringify(token));
        // Our helper function will set the Authorization header with the token
        setAuthToken(token);
        this.props.history.push('/protected');
      })
      // This will grab the errors from the request and set them in the state so they can be rendered
      .catch(err => this.setState({ errors: err.response.data }));
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

export default withRouter(Login);
