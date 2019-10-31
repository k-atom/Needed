import * as React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import Sidebar from '../../ts/components/sidebar';


let opened: boolean = true;

const SetSidebarOpen = (open: boolean) => {
  opened = open;
};

const previous = {
  opened: opened,
  SetSidebarOpen: SetSidebarOpen
};


interface Previous {
  opened?: boolean;
  SetSidebarOpen: (open: boolean) => void;
}

const Proxy = (previous: Previous) => (
  <BrowserRouter>
    <Sidebar {...previous}/>
  </BrowserRouter>
);


describe('Sidebar', () => {
  const component = mount(
    <Proxy {...previous} />
  );

  it('Check node of MapComponent', () => {
    let reactWrapper: any;

    // Main container
    expect(component.find('div.sidebar')).toHaveLength(1);

    // Side background
    expect(component.find('div.sidebar__background')).toHaveLength(1);

    // Side container
    expect(component.find('div.sidebar__container')).toHaveLength(1);

    // Head navbar
    reactWrapper = component.find('nav.head__navbar');
    expect(reactWrapper).toHaveLength(1);

    // Menu icon
    expect(reactWrapper.find('i')).toHaveLength(1);

    // Head logo
    reactWrapper = reactWrapper.find('a');
    expect(reactWrapper).toHaveLength(1);
    expect(reactWrapper.prop('href')).toEqual('/');
    expect(reactWrapper.find('img')).toHaveLength(1);
    expect(reactWrapper.find('img').prop('src'))
      .toEqual('/images/K_Logo_160x160.png');
    expect(reactWrapper.text()).toEqual('Needed');


    // Navbar list
    reactWrapper = component.find('div.list');
    expect(reactWrapper).toHaveLength(1);
    // Link of Navbar list
    reactWrapper = reactWrapper.find('a');
    expect(reactWrapper).toHaveLength(2);
    expect(reactWrapper.at(0).prop('href')).toEqual('/');
    expect(reactWrapper.at(1).prop('href')).toEqual('/Needed');
    // Text of Navbar list
    expect(reactWrapper.at(0).find('div.text')).toHaveLength(1);
    expect(reactWrapper.at(0).find('div.text').text()).toEqual('首頁');
    expect(reactWrapper.at(1).find('div.text')).toHaveLength(1);
    expect(reactWrapper.at(1).find('div.text').text()).toEqual('Needed');
    // Icon of Navbar list
    reactWrapper = reactWrapper.find('i');
    expect(reactWrapper).toHaveLength(2);
    // expect(reactWrapper.at(0).text()).toEqual('menu');
    expect(reactWrapper.at(0).text()).toEqual('home');
    expect(reactWrapper.at(1).text()).toEqual('add_box');

    expect(component.html()).toMatchSnapshot();
  });
  it('Sidebar is open by default', () => {
    expect(component.find('div.sidebar').prop('data-opened')).toEqual(true);
  });
  it('Sidebar is close by default', () => {
    // Reset status is close
    previous.opened = false;
    component.setProps(previous);
    expect(component.find('div.sidebar').prop('data-opened')).toEqual(false);

    // Reset status is unexpected token
    previous.opened = undefined as any;
    component.setProps(previous);
    expect(component.find('div.sidebar').prop('data-opened')).toEqual(false);
  });
  it('Click on the background should close the sidebar', () => {
    // Reset status is open
    previous.opened = true;
    component.setProps(previous);
    // Close sidebar
    component.find('div.sidebar__background').simulate('click');
    previous.opened = opened;
    component.setProps(previous);
    expect(component.find('div.sidebar').prop('data-opened')).toEqual(false);
  });
  it('Click on the menu icon should close the sidebar', () => {
    // Reset status is open
    previous.opened = true;
    component.setProps(previous);
    // Close sidebar
    component.find('nav.head__navbar')
      .find('i')
      .simulate('click');
    previous.opened = opened;
    component.setProps(previous);
    expect(component.find('div.sidebar').prop('data-opened')).toEqual(false);
  });
});
