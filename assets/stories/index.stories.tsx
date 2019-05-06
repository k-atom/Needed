import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { storiesOf } from '@storybook/react';

import Header from '../ts/components/header';

storiesOf('Head', module)
  .add('head', () => (
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ));
