import expect from 'expect';

import actions from '../../src/actions/WikiActionCreators';
import * as types from '../../src/constants/ActionTypes';

describe('WikiActionCreators', () => {
  it('should update history with new query and article', () => {
    const query = 'tweet tweet';
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
});
