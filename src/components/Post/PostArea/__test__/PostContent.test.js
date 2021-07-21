import React from 'react';
import ReactDOM from 'react-dom';
import PostContent from '../PostContent';

import { cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from 'react-test-renderer';

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<PostContent noPost={false} myPost={false} postTime={0} postTitle={"test"} postContent={"test"} posterUid={0} friends={[]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", () => {
  const tree = renderer.create(<PostContent noPost={false} myPost={false} postTime={0} postTitle={"test"} postContent={"test"} posterUid={0} friends={[]}/>).toJSON();
  expect(tree).toMatchSnapshot();
});