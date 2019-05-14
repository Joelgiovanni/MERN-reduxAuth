import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../helpers/setAuthToken';

// Register a user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('http://localhost:5000/api/register', userData)
    .then(res => history.push('/login'))
    // This will grab the errors from the request and set them in the state so they can be rendered
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login and get the user token
export const loginUser = userData => dispatch => {
  // Axios request
  axios
    .post('http://localhost:5000/api/login', userData)
    .then(res => {
      // Save the Token to local storage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // Our helper function will set the Authorization header with the token
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set the logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remoce auth header -- Call the setAuth token with FALSE so that no token is provided
  setAuthToken(false);
  // Set the 'Current User' to a empty object || that will also set 'isAuthenticated' to false. This will now deny access to protected routes
  dispatch(setCurrentUser({}));
};
