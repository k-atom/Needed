import * as React from 'react';
import { mount } from 'enzyme';

import MapComponent from '../../ts/components/mapComponent';

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

describe('MapComponent', () => {
  const component = mount(<MapComponent {...previous}/>);

  it('Check node of MapComponent', () => {
    expect(component.find('div.mapComponent')).toHaveLength(1);
    expect(component.find('Button')).toHaveLength(1);
    expect(component.find('i.material-icons')).toHaveLength(1);
    expect(component.find('i.material-icons').text()).toEqual('my_location');
    expect(component.html()).toMatchSnapshot();
  });
  it('Should be get geoLocation', () => {
    component.find('Button').props().onClick({} as any);
  });
  it('Should not get geoLocation', () => {
    component.find('Button').props().onClick({} as any);
  });
  it('Should not create geoLocation', () => {
    (window.navigator.geolocation as any) = undefined;
    component.find('Button').props().onClick({} as any);
  });
});
