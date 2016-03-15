import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Home from '../../src/containers/Home/Home';

function setup() {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Home />);
  const output = renderer.getRenderOutput();

  return { output, renderer };
}

describe('HomeContainer', () => {
  it('should render correctly when invoked', () => {
    const { output } = setup();

    expect(output.type).toBe('div');
    expect(output.props.className).toEqual('container home-page');

    const [WikiSidePanel, SearchInput, TweetList] = output.props.children;
    expect(WikiSidePanel.type.displayName).toBe('Connect(WikiSidePanel)');
    expect(SearchInput.type.displayName).toBe('Connect(SearchInput)');
    expect(TweetList.type.displayName).toBe('Connect(TweetList)');
  });
});
