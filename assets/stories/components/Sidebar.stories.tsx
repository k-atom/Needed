import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { storiesOf } from '@storybook/react';

import Sidebar from '../../ts/components/sidebar';


const SetSidebarOpen = (open: boolean): void => {
  console.log(open);
}

const sidebarProps = {
  opened: true
};

storiesOf('Sidebar', module)
  .add('default', () => (
    <MemoryRouter>
      <Sidebar SetSidebarOpen={SetSidebarOpen} {...sidebarProps}/>
    </MemoryRouter>
  ));
