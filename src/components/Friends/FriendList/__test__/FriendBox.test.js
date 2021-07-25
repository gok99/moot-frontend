import React from 'react';
import ReactDOM from 'react-dom';
import FriendBox from '../FriendBox';

import { cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from 'react-test-renderer';

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<FriendBox fUid={0} fUsername={""} fTeleUser={""} onViewPost={(fUid, fUsername) => (event) => { event.preventDefault(); }} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", () => {
  const tree = renderer.create(<FriendBox fUid={0} fUsername={""} fTeleUser={""} onViewPost={(fUid, fUsername) => (event) => { event.preventDefault(); }} />).toJSON();
  expect(tree).toMatchSnapshot();
});