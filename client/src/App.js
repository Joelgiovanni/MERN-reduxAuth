import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import setAuthToken from './helpers/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store'; // This is the Redux 'setup' file
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Home from './components/layout/home';
import Register from './components/forms/register';
import Login from './components/forms/login';
import Dashboard from './components/layout/dashboard';

// Keeping a user logged in on refresh. Will also check for a valid/notExpired token on every page
if (localStorage.jwtToken) {
  // Set authToken header
  setAuthToken(localStorage.jwtToken);
  // Decode token to get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and is isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check to see if token is expired
  const currentTime = Date.now() / 1000; // This will vary depending on the amount of time that you set for token exp.
  if (decoded.exp < currentTime) {
    // Logout user if token is expired
    store.dispatch(logoutUser);
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/dashboard' component={Dashboard} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
