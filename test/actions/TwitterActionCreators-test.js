import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';

import actions from '../../src/actions/TwitterActionCreators';
import * as types from '../../src/constants/ActionTypes';
import {
  FETCH_IDLE,
  FETCH_SUCCESS,
  FETCH_ERROR,
  FETCH_INIT
} from '../../src/constants/FetchStatuses';
import { initialState } from '../../src/reducers/twitter';
import config from '../../src/config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('TwitterActionCreators', () => {
  afterEach(() => {
    nock.cleanAll(); // https://github.com/pgte/nock#cleanall
  });

  it('should set query when a new query is provided', () => {
    const query = 'tweet tweet';
    const expectedAction = {
      type: types.SET_TWITTER_QUERY, query
    };
    expect(actions.setQuery(query)).toEqual(expectedAction);
  });

  it('should set tweets when successful search', (done) => {
    const query = 'tweet';
    const tweets = [{ id: '1' }, { id: '2' }, { id: '3' }];

    nock(config.ENDPOINT)
      .get(`/api/search-twitter?q=${query}`)
      .reply(200, tweets);

    const store = mockStore(initialState);
    const expectedActions = [
      { type: types.SEARCH_TWITTER, fetchStatus: FETCH_INIT, query },
      { type: types.SEARCH_TWITTER, fetchStatus: FETCH_SUCCESS, query },
      { type: types.SET_TWITTER_TWEETS, tweets }
    ];

    store.dispatch(actions.search(query)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
