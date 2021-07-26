import React from 'react';
import ReactDOM from 'react-dom';
import OnboardingWelcomeForm from '../OnboardingWelcomeForm';

import { cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from 'react-test-renderer';

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<OnboardingWelcomeForm onSubmit={(event) => { event.preventDefault(); }} username={""} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", () => {
  const tree = renderer.create(<OnboardingWelcomeForm onSubmit={(event) => { event.preventDefault(); }} username={""} />).toJSON();
  expect(tree).toMatchSnapshot();
});