import * as React from "react";
import * as renderer from "react-test-renderer";
import { MemoryRouter } from 'react-router'
import Header from "../ts/components/header";

test('Header', () => {
  const component = renderer.create(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
