import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { SearchInput } from '../../../src/containers/SearchInput/SearchInput';

const mockStore = configureMockStore({});

function setup() {
  const props = { store: mockStore };

  const renderer = TestUtils.createRenderer();
  renderer.render(<SearchInput {...props} />);
  const output = renderer.getRenderOutput();

  return { output, renderer };
}

describe('SearchInputContainer', () => {
  it('should render correctly when invoked', () => {
    const { output } = setup();

    expect(output.type).toBe('div');
    expect(output.props.className).toEqual('search-input');

    const form = output.props.children[1];
    expect(form.type).toBe('form');

    expect(form.props.children.length).toEqual(3);
    const [img, input, button] = form.props.children;

    expect(img.props.src).toEqual('/images/icon.png');
    expect(input.props.className).toEqual('form-control');
    expect(button.props.type).toEqual('submit');
  });

  it('should have a disabled button when initially rendered', () => {
    const { output } = setup();
    const form = output.props.children[1];
    const button = form.props.children[2];

    expect(button.props.disabled).toBe(true);
  });

  it('should have an empty input value when initially rendered', () => {
    const { output } = setup();
    const form = output.props.children[1];
    const input = form.props.children[1];

    expect(input.props.value).toNotExist();
  });
});
