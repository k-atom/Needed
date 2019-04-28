import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router'

import Header from '../js/components/header'

test('Header', () => {
  const component = renderer.create(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
