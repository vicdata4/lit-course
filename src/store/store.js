import { createStore, applyMiddleware, combineReducers } from 'redux';
// import { auth } from './reducers/auth-reducer';
import { notes } from './reducers/notes.reducer.js';
import thunk from 'redux-thunk';

export const store = createStore(
  combineReducers({
    // auth,
    notes,
  }),
  applyMiddleware(thunk),
);
