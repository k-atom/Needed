import '../../css/needed.scss';

import * as React from "react";

import MapContainer from '../components/map';

const useEffect = React.useEffect;
const useState = React.useState;

function Needed() {
  const [lat, setLat] = useState<number>(25.032697);
  const [lng, setLng] = useState<number>(121.563086);
  const [position, setPosition] = useState<[number, number]>([lat, lng]);
  const [zoom, setZoom] = useState<number>(13);

  const previous = {
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

  useEffect(() => {
    setPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    lat == position[0] || setLat(position[0]);
    lng == position[1] || setLng(position[1]);
  }, [position]);

  return (
    <div className="needed-container">
      <MapContainer {...previous}>
      </MapContainer>
    </div>
  )
}

export default Needed;
