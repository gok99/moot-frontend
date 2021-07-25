import React from 'react';
import ReactDOM from 'react-dom';
import AddTagForm from '../AddTagForm';

import { cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from 'react-test-renderer';

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddTagForm tagList={[]} onAddTag={(tag) => (event) => { event.preventDefault(); }} postCreationCheck={true} libraryCheck={true} ownedError={""} currentPostTag={""} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddTagForm tagList={[]} onAddTag={(tag) => (event) => { event.preventDefault(); }} postCreationCheck={true} libraryCheck={false} ownedError={""} currentPostTag={""} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddTagForm tagList={[]} onAddTag={(tag) => (event) => { event.preventDefault(); }} postCreationCheck={false} libraryCheck={false} ownedError={""} currentPostTag={""} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", () => {
  const tree = renderer.create(<AddTagForm tagList={[]} onAddTag={(tag) => (event) => { event.preventDefault(); }} postCreationCheck={true} libraryCheck={true} ownedError={""} currentPostTag={""} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("matches snapshot", () => {
  const tree = renderer.create(<AddTagForm tagList={[]} onAddTag={(tag) => (event) => { event.preventDefault(); }} postCreationCheck={true} libraryCheck={false} ownedError={""} currentPostTag={""} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("matches snapshot", () => {
  const tree = renderer.create(<AddTagForm tagList={[]} onAddTag={(tag) => (event) => { event.preventDefault(); }} postCreationCheck={false} libraryCheck={false} ownedError={""} currentPostTag={""} />).toJSON();
  expect(tree).toMatchSnapshot();
});