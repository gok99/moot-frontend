import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from '../CommentBox';

import { cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from 'react-test-renderer';

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<CommentBox  />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", () => {
  const tree = renderer.create(<CommentBox  />).toJSON();
  expect(tree).toMatchSnapshot();
});