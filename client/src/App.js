import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Home from './components/layout/home';
import Register from './components/forms/register';
import Login from './components/forms/login';

if (localStorage.jwtToken) {
  console.log('token');
}

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
