import * as React from "react";
import { Button } from 'antd';

import * as geolocation from '../lib/geolocation';

interface MapComponentPrevious {
  fn: {
    setPosition: (arr: [number, number]) => void
  }
}

function MapComponent(previous: MapComponentPrevious) {
  let geoObj: any;

  const geoSuccess = (e: any) => {
    previous.fn.setPosition([
      e.coords.latitude,
      e.coords.longitude
    ]);
  };

  const geoError = (e: any) => {
  };

  const getLocation = () => {
    geolocation.createGeolocation().then((e) => {
      geoObj = e;
      geoObj.getCurrentPosition(geoSuccess, geoError);
    })
    .catch((e) => {
    });
  }

  return (
    <div className="mapComponent bottom right">
      <Button title="定位當前位置" className="btn" onClick={getLocation}>
        <i className="material-icons">
          my_location
        </i>
      </Button>
    </div>
  )
}

export default MapComponent;
