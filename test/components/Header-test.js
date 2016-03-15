import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Header from '../../src/components/Header/Header';

function setup() {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Header />);
  const output = renderer.getRenderOutput();

  return { output, renderer };
}

describe('HeaderComponent', () => {
  it('should render correctly when invoked', () => {
    const { output } = setup();

    expect(output.type).toBe('header');
    expect(output.props.children.length).toEqual(4);

    output.props.children.map(child => {
      expect(child.type).toBe('div');
    });
  });
});
