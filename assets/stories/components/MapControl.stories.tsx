import '../../css/components/mapControl.scss';

import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { storiesOf } from '@storybook/react';

import MapControl from '../../ts/components/mapControl';



function SnapContainer() {
  const [lat, setLat] = React.useState<number>(25.032697);
  const [lng, setLng] = React.useState<number>(121.563086);
  const [position, setPosition] = React.useState<[number, number]>([lat, lng]);

  const _drawMarker = (e: any) => {
  };

  let previous = {
    lat: lat,
    lng: lng,
    position: position,
    fn: {
      setLat: setLat,
      setLng: setLng,
      setPosition: setPosition,
      _drawMarker: _drawMarker
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '20vw'
      }}
    >
      <MapControl {...previous}/>
    </div>
  );
}


storiesOf('MapControl', module)
  .add('default', () => (
    <MemoryRouter>
      <SnapContainer />
    </MemoryRouter>
  ));
