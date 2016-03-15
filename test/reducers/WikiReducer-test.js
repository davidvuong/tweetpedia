import _ from 'lodash';
import expect from 'expect';
import reducer, { initialState } from '../../src/reducers/wiki';
import * as types from '../../src/constants/ActionTypes';
import * as status from '../../src/constants/FetchStatuses';

describe('TwitterReducer', () => {
  it('should return the initialState when empty state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle the SET_WIKI_QUERY state', () => {
    const query = 'querying with abc123';
    const expectedState = _.clone(initialState);
    expectedState.query = query;

    expect(reducer(undefined, {
      type: types.SET_WIKI_QUERY, query
    })).toEqual(expectedState);
  });

  it('should handle the SET_ACTIVE_WIKI_ARTICLE state', () => {
    const activeArticle = { title: 'Example article', text: 'I like pie' };
    const expectedState = _.clone(initialState);
    expectedState.activeArticle = activeArticle;

    expect(reducer(undefined, {
      type: types.SET_ACTIVE_WIKI_ARTICLE, activeArticle
    })).toEqual(expectedState);
  });

  it('should handle the UPDATE_WIKI_HISTORY state', () => {
    const article = { title: 'Example article', text: 'I like pie' };
    const query = 'example query';

    const expectedState = _.clone(initialState);
    expectedState.history = [{ article, query }];

    expect(reducer(undefined, {
      type: types.UPDATE_WIKI_HISTORY, article, query
    })).toEqual(expectedState);
  });

  it('should handle the UPDATE_WIKI_HISTORY state when there is past', () => {
    const article = { title: 'Pie Pie Pie 1', text: 'I like pie' };
    const query = 'pie is good';

    const currentState = _.clone(initialState);
    currentState.history = [{ article, query }];

    const expectedState = _.clone(currentState);
    expectedState.history = [{ article, query }, { article, query }];

    expect(reducer(currentState, {
      type: types.UPDATE_WIKI_HISTORY, article, query
    })).toEqual(expectedState);
  });

  it('should handle the TOGGLE_WIKI_PANEL state', () => {
    const isEnlarged = true;

    const expectedState = _.clone(initialState);
    expectedState.isEnlarged = isEnlarged;

    expect(reducer(undefined, {
      type: types.TOGGLE_WIKI_PANEL, isEnlarged
    })).toEqual(expectedState);
  });

  it('should handle the SEARCH_WIKI state', () => {
    const query = 'wiiiikkkiiipeeedddiiiaaaa';

    const expectedState = _.clone(initialState);
    expectedState.fetchStatus = status.FETCH_INIT;
    expectedState.query = query;

    expect(reducer(undefined, {
      type: types.SEARCH_WIKI, fetchStatus: status.FETCH_INIT, query
    })).toEqual(expectedState);
  });
});
