/**
  * Import style and images
  */
import "../../css/components/map.scss";
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';

/**
  * Import modules
  */
import * as React from "react";
import {
  Map as LeafletMap,
  TileLayer,
  Circle,
  Rectangle,
  Marker,
  CircleMarker,
  Polyline,
  Polygon
} from 'react-leaflet';
import { EditControlFeatureGroup } from '@k-atom/react-leaflet-draw';

/**
  * Import components
  */
import MapComponent from './mapComponent';


/**
  * Previous Interface
  */
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
  },
  MapControlRef: any
}


/**
  * Set alias for React hook function
  */
const useEffect = React.useEffect;
const useRef = React.useRef;
const useState = React.useState;

/**
  * Set to not display all components of the l.draw.toolbar
  */
const controlSettings = {
  draw: {
    rectangle: false,
    marker: false,
    circle: false,
    circlemarker: false,
    polygon: false,
    polyline: false
  },
  edit: {
    edit: false,
    remove: false
  },
};


/**
  * MapContainer hook
  */
function MapContainer(previous: MapContainerPrevious) {
  // Provides to the viewport
  const [zoom, setZoom] = useState<number>(previous.zoom);
  // elementsById stores all draw
  const [elementsById, setElementsById] = useState<Map<any, any>>(new Map());
  // Provides to the Map component of react-leaflet
  const [viewport, setViewport] = useState<{center: [number, number], zoom: number}>({
    center: previous.position,
    zoom: previous.zoom
  });

  const editControlFeatureGroupRef = useRef();

  const MapComponentPrevious = {
    fn: {
      setPosition: previous.fn.setPosition
    }
  };


  /**
    * Set functions for Map component of React-Leaflet-Draw
    */

  const _deleteShape = (id: number)  => {
    const item = elementsById.get(id);
    if (!item) {
      console.log('No matching item, perhaps a race? skip')
      return;
    }

    const newMap = new Map(elementsById.entries());
    newMap.delete(id);
    setElementsById(newMap);
  };

  const _getHighestId = () => {
    return Math.max(...elementsById.keys() as any) | 0;
  };

  const _handleCreated = (evt: any) => {
    const {lat: evtLat, lng: evtLng} = evt.layer.getLatLng();
    previous.fn.setPosition([evtLat, evtLng]);
  };

  const _handleDeleted = (elem: any, layer: any, evt: any) => {
    const id = Number.parseInt(elem.key);
    _deleteShape(id);
  };

  const _handleEdited = (elem: any, layer: any, evt: any) => {
    const id = Number.parseInt(elem.key);
    const item = elementsById.get(id);
    if (!item) {
      console.log('No matching item, perhaps a race? skip')
      return;
    }

    const layerType = item.type;
    const newMap = new Map(elementsById.entries());
    const newId = _getHighestId() + 1;
    const newProps = {
      polygon: (l: any) => ({ positions: l.getLatLngs() }),
      polyline: (l: any) => ({ positions: l.getLatLngs() }),
      circlemarker: (l: any) => ({ center: l.getLatLng(), radius: l.getRadius() }),
      marker: (l: any) => ({ position: l.getLatLng() }),
      circle: (l: any) => ({ center: l.getLatLng(), radius: l.getRadius() }),
      rectangle: (l: any) => null // copy existing item
    }[layerType](layer);

    newMap.set(newId, { type: layerType, ...newProps });
    newMap.delete(id);

    setElementsById(newMap);
  };

  const _handleActivityStarted = (e: any) => {
    console.log('started', e);
    const { flagStartedEditing } = previous as any;
    if (flagStartedEditing) {
      flagStartedEditing();
    }
  };

  const _handleActivityStopped = (e: any) => {
    console.log('stopped', e);
    const { flagStoppedEditing } = previous as any;
    if (flagStoppedEditing) {
      flagStoppedEditing();
    }
  };

  /**
    * Store the current zoom value when the map is zoomed
    */
  const onViewportChange = (e: any) => {
    setZoom(e.zoom);
  };

  /**
    * Want to see the draw queue at the end of the drawing
    * ``` js
    * useEffect(() => {
    *   console.log(elementsById)
    *   {[...elementsById.keys() as any].map(id => {
    *     console.log(elementsById.get(id))
    *   })}
    * }, [elementsById]);
    * ```
    */

  useEffect(() => {
    // Set a new position for elementsById
    const newMap = new Map(elementsById.entries());
    newMap.set(0, {
      type: 'marker',
      position: previous.position
    });
    setElementsById(newMap);

    // Reset the view center of the Map
    setViewport({
      center: previous.position,
      zoom: zoom
    });
  }, [previous.position]);

  useEffect(() => {
    previous.MapControlRef.current = {};
    previous.MapControlRef.current.EditControlFeatureGroupRef = editControlFeatureGroupRef;
  }, []);

  return (
    <div className="mapContainer">
      <LeafletMap
        viewport={viewport}
        onViewportChange={onViewportChange}
        maxZoom={19}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapComponent {...MapComponentPrevious}/>
        <EditControlFeatureGroup
          controlProps={controlSettings}
          onCreated={_handleCreated}
          onEdited={_handleEdited}
          onDeleted={_handleDeleted}
          onActivityStarted={_handleActivityStarted}
          onActivityStopped={_handleActivityStopped}
          ref={editControlFeatureGroupRef}
        >
          {[...elementsById.keys() as any].map(id => {
            const { type, ...props } = elementsById.get(id)
            const Element = {
              polygon: Polygon,
              polyline: Polyline,
              circlemarker: CircleMarker,
              marker: Marker,
              circle: Circle,
              rectangle: Rectangle
            }[type]
            return <Element key={id} {...props} editing={true}/>
          })}
        </EditControlFeatureGroup>
      </LeafletMap>
    </div>
  )
}

export default MapContainer;
