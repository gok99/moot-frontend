import React from 'react';
import ReactDOM from 'react-dom';
import ChatBoxList from '../ChatBoxList';

import { cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from 'react-test-renderer';

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChatBoxList chatList={[]} chatInfo={""} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", () => {
  const tree = renderer.create(<ChatBoxList chatList={[]} chatInfo={""} />).toJSON();
  expect(tree).toMatchSnapshot();
});
