import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers/reducer';

export default (initialState) => {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(
      thunkMiddleware
    )
  );
};
