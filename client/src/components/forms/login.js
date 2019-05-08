import React, { Component } from 'react';

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

    console.log(user);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className='container'>
        <h1 className='display-4 text-center'> Register </h1>
        <form onSubmit={this.onSubmit} noValidate>
          <div className='form-group'>
            <label>Login</label>
            <input
              type='email'
              name='email'
              className='form-control'
              placeholder='Enter email'
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              className='form-control'
              placeholder='Password'
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
