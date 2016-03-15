import _ from 'lodash';
import expect from 'expect';
import reducer, { initialState } from '../../src/reducers/twitter';
import * as types from '../../src/constants/ActionTypes';
import * as status from '../../src/constants/FetchStatuses';

describe('TwitterReducer', () => {
  it('should return the initialState when empty state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle the SET_TWITTER_QUERY state', () => {
    const query = 'tweet tweet';

    const expectedState = _.clone(initialState);
    expectedState.query = query;

    expect(reducer(undefined, {
      type: types.SET_TWITTER_QUERY, query
    })).toEqual(expectedState);
  });

  it('should handle the SET_TWITTER_TWEETS state', () => {
    const tweets = [{ text: 'this' }, { text: 'is' }, { text: 'madness' }];

    const expectedState = _.clone(initialState);
    expectedState.tweets = tweets;

    expect(reducer(undefined, {
      type: types.SET_TWITTER_TWEETS, tweets
    })).toEqual(expectedState);
  });

  it('should handle the SEARCH_TWITTER state', () => {
    const query = 'search twitter example';

    const expectedState = _.clone(initialState);
    expectedState.query = query;
    expectedState.fetchStatus = status.FETCH_INIT;

    expect(reducer(undefined, {
      type: types.SEARCH_TWITTER, query, fetchStatus: status.FETCH_INIT
    })).toEqual(expectedState);
  });
});
