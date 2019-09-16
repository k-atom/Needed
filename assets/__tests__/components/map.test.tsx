import * as React from 'react';
import { mount } from 'enzyme';

import MapContainer from '../../ts/components/map';

let lat: number = 25.032697;
let lng: number = 121.563086;
let position:[number, number] = [lat, lng];
let zoom: number = 13;

const setLat = (num: number) => {
  lat = num;
  setPosition([lat, lng]);
}

const setLng = (num: number) => {
  lng = num;
  setPosition([lat, lng]);
}

const setPosition = ([lat, lng]: [number, number]) => {
  position = [lat, lng];
  previous.position = position;
}

const setZoom = (num: number) => {
  zoom = num;
}

let previous = {
  lat: lat,
  lng: lng,
  position: position,
  zoom: zoom,
  fn: {
    setLat: setLat,
    setLng: setLng,
    setPosition: setPosition,
    setZoom: setZoom
  }
}

describe('MapContainer', () => {
  const component = mount(<MapContainer {...previous}/>);

  it('Check node of MapContainer', () => {
    let componentRender = component.render();

    expect(component.find('Map')).toHaveLength(1);
    expect(componentRender.find('div.leaflet-container')).toHaveLength(1);
    expect(componentRender.find('div.mapComponent')).toHaveLength(1);
    expect(component.html()).toMatchSnapshot();
  });
  it('Node of MapContainer changes when previous position changes', () => {
    let snapHTML: string;

    snapHTML = component.html();
    previous.fn.setLat(0);
    component.setProps(previous);
    expect(component.html() != snapHTML ).toBe(true);

    snapHTML = component.html();
    previous.fn.setLng(0);
    component.setProps(previous);
    expect(component.html() != snapHTML ).toBe(true);

    snapHTML = component.html();
    previous.fn.setPosition([1, 1]);
    component.setProps(previous);
    expect(component.html() != snapHTML ).toBe(true);
  });
});
