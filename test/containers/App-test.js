import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import App from '../../src/containers/App/App';

function setup() {
  const renderer = TestUtils.createRenderer();
  renderer.render(<App />);
  const output = renderer.getRenderOutput();

  return { output, renderer };
}

describe('AppContainer', () => {
  it('should render correctly when invoked', () => {
    const { output } = setup();

    expect(output.type).toBe('div');
    expect(output.props.className).toEqual('app');
    expect(output.props.children.length).toEqual(3);
  });
});
