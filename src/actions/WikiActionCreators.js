import fetch from 'isomorphic-fetch';
import config from '../config';
import {
  SET_WIKI_QUERY,
  SEARCH_WIKI,
  UPDATE_WIKI_HISTORY,
  TOGGLE_WIKI_PANEL,
  TOGGLE_WIKI_TAB
} from '../constants/ActionTypes';
import { FETCH_INIT, FETCH_SUCCESS, FETCH_ERROR } from '../constants/FetchStatuses';

function updateHistory(query, article) {
  return { type: UPDATE_WIKI_HISTORY, query, article };
}

function setQuery(query) {
  return { type: SET_WIKI_QUERY, query };
}

function togglePanel(isEnlarged) {
  return { type: TOGGLE_WIKI_PANEL, isEnlarged };
}

function toggleTab(activeTab) {
  return { type: TOGGLE_WIKI_TAB, activeTab };
}

function searchInit(query) {
  return { type: SEARCH_WIKI, fetchStatus: FETCH_INIT, query };
}

function searchSuccess(query) {
  return { type: SEARCH_WIKI, fetchStatus: FETCH_SUCCESS, query };
}

function searchError() {
  return { type: SEARCH_WIKI, fetchStatus: FETCH_ERROR, query: '' };
}

function search(query) {
  return (dispatch) => {
    dispatch(searchInit(query));

    // Make sure to encode the url before making a request.
    const encodedQuery = encodeURIComponent(query);
    const endpoint = `${config.ENDPOINT}/api/search-wikipedia?q=${encodedQuery}`;
    return fetch(endpoint).then(res => {
      return res.json();
    }).then((article) => {
      dispatch(searchSuccess(query));
      dispatch(updateHistory(query, article));
    }, () => {
      dispatch(searchError());
    });
  };
}

export default { search, updateHistory, setQuery, toggleTab, togglePanel };
