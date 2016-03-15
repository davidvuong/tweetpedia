import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';

import actions from '../../src/actions/WikiActionCreators';
import * as types from '../../src/constants/ActionTypes';
import {
  FETCH_IDLE,
  FETCH_SUCCESS,
  FETCH_ERROR,
  FETCH_INIT
} from '../../src/constants/FetchStatuses';
import { initialState } from '../../src/reducers/wiki';
import config from '../../src/config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('WikiActionCreators', () => {
  it('should update history with new query and article', () => {
    const query = 'wiki wiki';
    const article = { title: 'Example', description: 'example description' };

    const expectedAction = {
      type: types.UPDATE_WIKI_HISTORY, query, article
    };
    expect(actions.updateHistory(query, article)).toEqual(expectedAction);
  });

  it('should set new wiki search query when provided', () => {
    const query = 'tweet tweet';
    const expectedAction = {
      type: types.SET_WIKI_QUERY, query
    };
    expect(actions.setQuery(query)).toEqual(expectedAction);
  });

  it('should set isEnlarged when panel is toggled', () => {
    const isEnlarged = true;
    const expectedAction = {
      type: types.TOGGLE_WIKI_PANEL, isEnlarged
    };
    expect(actions.togglePanel(isEnlarged)).toEqual(expectedAction);
  });

  it('should set history when successful search', (done) => {
    const query = 'wwwwikiki';
    const article = { title: 'mememe', description: 'yoyuyoyou' };

    nock(config.ENDPOINT)
      .get(`/api/search-wikipedia?q=${query}`)
      .reply(200, article);

    const store = mockStore(initialState);
    const expectedActions = [
      { type: types.SEARCH_WIKI, fetchStatus: FETCH_INIT, query },
      { type: types.SEARCH_WIKI, fetchStatus: FETCH_SUCCESS, query },
      { type: types.UPDATE_WIKI_HISTORY, query, article },
      { type: types.SET_ACTIVE_WIKI_ARTICLE, activeArticle: article }
    ];

    store.dispatch(actions.search(query)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
