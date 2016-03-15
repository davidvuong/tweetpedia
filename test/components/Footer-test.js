import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Footer from '../../src/components/Footer/Footer';

function setup() {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Footer />);
  const output = renderer.getRenderOutput();

  return { output, renderer };
}

describe('FooterComponent', () => {
  it('should render correctly when invoked', () => {
    const { output } = setup();
    expect(output.type).toBe('footer');

    const [ p, div ] = output.props.children;
    const a = p.props.children;
    expect(a.props.href).toEqual('https://github.com/davidvuong/tweetpedia');

    expect(div.type).toBe('div');
    expect(div.props.className).toBe('bars');
  });
});
