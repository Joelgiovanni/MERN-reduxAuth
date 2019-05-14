import { createStore, applyMiddleware, compose } from 'redux'; // Compose is brought in so that we can combine the reducer with what is required by chrome to add the Redux extension
import thunk from 'redux-thunk'; // Middleware
import rootReducer from './reducers/index';

const initialState = {};

const middleware = [thunk];

// Create the store
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
