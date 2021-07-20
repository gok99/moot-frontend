import React from 'react';
import ReactDOM from 'react-dom';
import PostComments from '../PostComments';

import { cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from 'react-test-renderer';

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<PostComments uid={0} postUid={0} posterUid={0} commentedPostKey={0} friends={[]} comments={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", () => {
  const tree = renderer.create(<PostComments uid={0} postUid={0} posterUid={0} commentedPostKey={0} friends={[]} comments={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
