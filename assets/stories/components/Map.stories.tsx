import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { storiesOf } from '@storybook/react';

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
  },
  MapControlRef: {}
}

function SnapContainer() {
  previous.MapControlRef = React.useRef();

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw'
      }}
    >
      <MapContainer {...previous} />
    </div>
  );
}

storiesOf('Map', module)
  .add('default', () => (
    <MemoryRouter>
      <SnapContainer />
    </MemoryRouter>
  ));
