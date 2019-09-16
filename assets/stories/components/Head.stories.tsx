import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { storiesOf } from '@storybook/react';

import Header from '../../ts/components/header';


const SetSidebarOpen = (open: boolean): void => {
  console.log(open);
}

storiesOf('Head', module)
  .add('default', () => (
    <MemoryRouter>
      <Header SetSidebarOpen={SetSidebarOpen} />
    </MemoryRouter>
  ));
