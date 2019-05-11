import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Apply to every request ||This will send the Auth Header with the token
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete the auth header if there is no token
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
