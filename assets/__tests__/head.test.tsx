import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router'

import Header from '../ts/components/header'


const SetSidebarOpen = (open: boolean) => {
  console.log(open)
};


test('Header deafault', () => {
  const component = renderer.create(
    <MemoryRouter>
      <Header SetSidebarOpen={SetSidebarOpen} />
    </MemoryRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
