import React from 'react';
import ReactDOM from 'react-dom';
import ChatBox from '../ChatBox';

import { cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from 'react-test-renderer';

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChatBox chatId={0} status={true} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", () => {
  const tree = renderer.create(<ChatBox chatId={0} status={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});
