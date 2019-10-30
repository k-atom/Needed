/**
  * Import style
  */
import '../../css/needed.scss';

/**
  * Import modules
  */
import * as React from "react";
import * as L from 'leaflet';

/**
  * Import components
  */
import MapContainer from '../components/map';
import MapControl from '../components/mapControl';


/**
  * Set alias for React hook function
  */
const useEffect = React.useEffect;
const useRef = React.useRef;
const useState = React.useState;

/**
  * Needed hook
  */
function Needed() {
  const [lat, setLat] = useState<number>(25.032697);
  const [lng, setLng] = useState<number>(121.563086);
  const [position, setPosition] = useState<[number, number]>([lat, lng]);
  const [zoom, setZoom] = useState<number>(13);

  const MapControlRef: any = useRef();

  const _drawMarker = (e: any) => {
    let mapElement = MapControlRef.current
                    .EditControlFeatureGroupRef.current
                    ._editControlRef.current
                    .leafletElement._map;
    let circle = new L.Draw.Marker(mapElement);
    circle.enable();
  };

  const MapContainerPrevious = {
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
    MapControlRef: MapControlRef
  };

  const MapControlPrevious = {
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

  useEffect(() => {
    position[0] == lat && position[1] == lng || setPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    lat == position[0] || setLat(position[0]);
    lng == position[1] || setLng(position[1]);
  }, [position]);

  return (
    <div className="needed-container">
      <MapContainer {...MapContainerPrevious} />
      <MapControl {...MapControlPrevious}/>
    </div>
  );
}

export default Needed;
