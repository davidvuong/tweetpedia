import { SEARCH_TWITTER, SET_TWITTER_QUERY } from '../constants/ActionTypes';
import { FETCH_INIT } from '../constants/FetchStatuses';

// TODO: This needs to be an async action to make requests to our backend.
function search(query) {
  // There must be some worth querying. Don't do it, man!
  return query ? { type: SEARCH_TWITTER, query, fetchStatus: FETCH_INIT } : null;
}
function setQuery(query) {
  return { type: SET_TWITTER_QUERY, query };
}

export default { search, setQuery };
