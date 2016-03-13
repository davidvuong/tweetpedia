import fetch from 'isomorphic-fetch';
import { SEARCH_TWITTER, SET_TWITTER_QUERY } from '../constants/ActionTypes';
import { FETCH_INIT, FETCH_SUCCESS, FETCH_ERROR } from '../constants/FetchStatuses';
import config from '../config';

function searchInit(query) {
  return { type: SEARCH_TWITTER, fetchStatus: FETCH_INIT, query };
}

function searchSuccess(tweets) {
  return { type: SEARCH_TWITTER, fetchStatus: FETCH_SUCCESS, query: '', tweets };
}

function searchError() {
  return { type: SEARCH_TWITTER, fetchStatus: FETCH_ERROR, query: '' };
}

function setQuery(query) {
  return { type: SET_TWITTER_QUERY, query };
}

function search(query) {
  // There must be some worth querying. Don't do it, man!
  if (!query) { return null; }

  return (dispatch) => {
    dispatch(searchInit(query));

    // Make sure to encode the url before making a request.
    const encodedQuery = encodeURIComponent(query);
    const endpoint = `${config.ENDPOINT}/api/search-twitter?q=${encodedQuery}`;
    return fetch(endpoint).then(res => {
      return res.json();
    }).then((tweets) => {
      dispatch(searchSuccess(tweets));
    }, () => {
      dispatch(searchError());
    });
  };
}

export default { search, setQuery };
