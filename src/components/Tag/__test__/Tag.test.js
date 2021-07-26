import React from 'react';
import ReactDOM from 'react-dom';
import Tag from '../index';

import { cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from 'react-test-renderer';

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tag tagName={""} owned={true} onTagPress={(tag) => (event) => { event.preventDefault(); }} postCreationCheck={true} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tag tagName={""} owned={false} onTagPress={(tag) => (event) => { event.preventDefault(); }} postCreationCheck={true} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tag tagName={""} owned={true} onTagPress={(tag) => (event) => { event.preventDefault(); }} postCreationCheck={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tag tagName={""} owned={false} onTagPress={(tag) => (event) => { event.preventDefault(); }} postCreationCheck={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", () => {
  const tree = renderer.create(<Tag tagName={""} owned={true} onTagPress={(tag) => (event) => { event.preventDefault(); }} postCreationCheck={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("matches snapshot", () => {
  const tree = renderer.create(<Tag tagName={""} owned={false} onTagPress={(tag) => (event) => { event.preventDefault(); }} postCreationCheck={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("matches snapshot", () => {
  const tree = renderer.create(<Tag tagName={""} owned={true} onTagPress={(tag) => (event) => { event.preventDefault(); }} postCreationCheck={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("matches snapshot", () => {
  const tree = renderer.create(<Tag tagName={""} owned={false} onTagPress={(tag) => (event) => { event.preventDefault(); }} postCreationCheck={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});