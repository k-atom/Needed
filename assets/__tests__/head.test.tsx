import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Header from '../ts/components/header'


const SetSidebarOpen = (open: boolean) => {
  this.setState({
    sidebarOpen: open
  });
};

describe('Header', () => {
  it('Header', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Header SetSidebarOpen={SetSidebarOpen} />
      </MemoryRouter>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('could be opened sidebar', () => {
    const SetSidebarOpen = jest.fn();
    const wrapper = mount(
      <BrowserRouter>
        <Header SetSidebarOpen={SetSidebarOpen} />
      </BrowserRouter>
    );

    wrapper.find('i.ripple').simulate('click');
    expect(SetSidebarOpen).toHaveBeenCalledWith(true);
  });
});
