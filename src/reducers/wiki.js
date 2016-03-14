import _ from 'lodash';
import {
  SET_WIKI_QUERY,
  SEARCH_WIKI,
  UPDATE_WIKI_HISTORY,
  TOGGLE_WIKI_PANEL
} from '../constants/ActionTypes';
import { FETCH_IDLE } from '../constants/FetchStatuses';
import { WIKI_TAB_ACTIVE } from '../constants/Constants';

export const initialState = {
  query: '',
  fetchStatus: FETCH_IDLE,
  activeTab: WIKI_TAB_ACTIVE,
  isEnlarged: false,
  history: []
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
    case UPDATE_WIKI_HISTORY:
      return handleHistoryUpdate(state, action);
    case TOGGLE_WIKI_PANEL:
      return { ...state, activeTab: action.activeTab };
    case SEARCH_WIKI:
      return { ...state, query: action.query, fetchStatus: action.fetchStatus };
    default:
      return state;
  }
};
