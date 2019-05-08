import React, { Component } from 'react';

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

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    console.log(newUser);
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
            <label>Name</label>
            <input
              type='name'
              name='name'
              className='form-control'
              onChange={this.onChange}
              value={this.state.name}
              placeholder='Enter name'
            />
          </div>
          <div className='form-group'>
            <label>Email address</label>
            <input
              type='email'
              name='email'
              onChange={this.onChange}
              value={this.state.email}
              className='form-control'
              placeholder='Enter email'
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              onChange={this.onChange}
              value={this.state.password}
              className='form-control'
              placeholder='Password'
            />
          </div>
          <div className='form-group'>
            <label>Verify Password</label>
            <input
              type='password'
              name='password2'
              onChange={this.onChange}
              value={this.state.password2}
              className='form-control'
              placeholder='Verify password'
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

export default Register;
