import React from 'react';
import ReactDOM from 'react-dom';
import ProfilePicture from '../index';

import { cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from 'react-test-renderer';

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProfilePicture pid={0} picStyle={""} account={true} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", () => {
  const tree = renderer.create(<ProfilePicture pid={0} picStyle={""} account={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});