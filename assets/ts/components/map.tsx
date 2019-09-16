import "../../css/components/map.scss";
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';

import * as React from "react";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import MapComponent from './mapComponent';

const useEffect = React.useEffect;
const useState = React.useState;

interface MapContainerPrevious {
  lat: number,
  lng: number,
  position: [number, number],
  zoom: number,
  fn: {
    setLat: (lat: number) => void,
    setLng: (lng: number) => void,
    setPosition: (arr: [number, number]) => void,
    setZoom: (zoom: number) => void
  }
}

function MapContainer(previous: MapContainerPrevious) {
  const [position, setPosition] = useState<[number, number]>(previous.position);
  const [zoom, setZoom] = useState<number>(previous.zoom);

  const MapComponentPrevious = {
    fn: {
      setPosition: previous.fn.setPosition
    }
  }

  useEffect(() => {
    setPosition(previous.position);
  }, [previous.position]);

  return (
    <div className="mapContainer">
      <Map
        center={position}
        zoom={zoom}
        maxZoom={19}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
          </Popup>
        </Marker>
        <MapComponent {...MapComponentPrevious}/>
      </Map>
    </div>
  )
}

export default MapContainer;
