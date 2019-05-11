import React, { Component } from 'react';
import classnames from 'classnames';
import axios from 'axios';

export default class login extends Component {
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
        localStorage.setItem('jwtToken', token);
        console.log('jwtToken');
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
