import fetch from 'isomorphic-fetch';
import config from '../config';
import {
  SEARCH_TWITTER,
  SET_TWITTER_QUERY,
  SET_TWITTER_TWEETS
} from '../constants/ActionTypes';
import { FETCH_INIT, FETCH_SUCCESS, FETCH_ERROR } from '../constants/FetchStatuses';

function searchInit(query) {
  return { type: SEARCH_TWITTER, fetchStatus: FETCH_INIT, query };
}

function searchSuccess(query) {
  return { type: SEARCH_TWITTER, fetchStatus: FETCH_SUCCESS, query };
}

function searchError() {
  return { type: SEARCH_TWITTER, fetchStatus: FETCH_ERROR, query: '' };
}

function setTweets(tweets) {
  return { type: SET_TWITTER_TWEETS, tweets };
}

function setQuery(query) {
  return { type: SET_TWITTER_QUERY, query };
}

function search(query) {
  return (dispatch) => {
    dispatch(searchInit(query));

    // Make sure to encode the url before making a request.
    const encodedQuery = encodeURIComponent(query);
    const endpoint = `${config.ENDPOINT}/api/search-twitter?q=${encodedQuery}`;
    return fetch(endpoint).then(res => {
      return res.json();
    }).then((tweets) => {
      dispatch(searchSuccess(query));
      dispatch(setTweets(tweets));
    }, () => {
      dispatch(searchError());
    });
  };
}

export default { search, setQuery };
