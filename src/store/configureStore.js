import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers/reducer';

let store;
export default (initialState) => {
  if (!store) {
    store = createStore(
      reducer,
      initialState,
      applyMiddleware(
        thunkMiddleware
      )
    );
  }
  return store;
};
