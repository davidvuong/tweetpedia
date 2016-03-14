import _ from 'lodash';
import {
  SET_WIKI_QUERY,
  SET_ACTIVE_WIKI_ARTICLE,
  SEARCH_WIKI,
  UPDATE_WIKI_HISTORY,
  TOGGLE_WIKI_PANEL
} from '../constants/ActionTypes';
import { FETCH_IDLE } from '../constants/FetchStatuses';

export const initialState = {
  query: '',
  fetchStatus: FETCH_IDLE,
  isEnlarged: false,
  history: [],
  activeArticle: {}
};

function handleHistoryUpdate(state, action) {
  const history = _.clone(state.history);
  history.push({
    query: action.query, article: action.article
  });
  return { ...state, history };
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_WIKI_QUERY:
      return { ...state, query: action.query };
    case SET_ACTIVE_WIKI_ARTICLE:
      return { ...state, activeArticle: action.activeArticle };
    case UPDATE_WIKI_HISTORY:
      return handleHistoryUpdate(state, action);
    case TOGGLE_WIKI_PANEL:
      return { ...state, isEnlarged: action.isEnlarged };
    case SEARCH_WIKI:
      return { ...state, query: action.query, fetchStatus: action.fetchStatus };
    default:
      return state;
  }
};
