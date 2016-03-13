import { SEARCH_TWITTER, SET_TWITTER_QUERY } from '../constants/ActionTypes';
import { FETCH_IDLE } from '../constants/FetchStatuses';

const initialState = {
  query: '',
  fetchStatus: FETCH_IDLE,
  tweets: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_TWITTER_QUERY:
      return { ...state, query: action.query };
    case SEARCH_TWITTER:
      return { ...state, query: action.query, fetchStatus: action.fetchStatus };
    default:
      return state;
  }
};
