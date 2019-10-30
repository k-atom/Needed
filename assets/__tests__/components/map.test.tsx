import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, ReactWrapper } from 'enzyme';

import MapContainer from '../../ts/components/map';

let lat: number = 25.032697;
let lng: number = 121.563086;
let position:[number, number] = [lat, lng];
let zoom: number = 13;

const setLat = (num: number) => {
  lat = num;
  setPosition([lat, lng]);
};

const setLng = (num: number) => {
  lng = num;
  setPosition([lat, lng]);
};

const setPosition = ([lat, lng]: [number, number]) => {
  position = [lat, lng];
  previous.position = position;
};

const setZoom = (num: number) => {
  zoom = num;
};

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
};

/**
 * This function resolves the 'act(...)' warnings
 * during the test.
 *
 * The warning seems to be triggered by asynchronous
 * calls to setData triggered by a useEffect function.
 * @param {ReactWrapper} wrapper A ReactWrapper to do update
 * @param {() => void)} _actions This function to do call back
 */
const actions = async (wrapper: ReactWrapper, _actions: any) => {
  await act(async () => {
    await (new Promise(resolve => setTimeout(resolve, 0)));
    _actions();
    wrapper.update();
  });
};

function SnapContainer() {
  previous.MapControlRef = React.useRef();

  return (
    <>
      <MapContainer {...previous} />
    </>
  );
}

describe('MapContainer', () => {
  const component = mount(<SnapContainer />);

  it('Check node of MapContainer', () => {
    let componentRender = component.render();

    expect(component.find('Map')).toHaveLength(1);
    expect(componentRender.find('div.leaflet-container')).toHaveLength(1);
    expect(componentRender.find('div.mapComponent')).toHaveLength(1);
    expect(componentRender.find('a.leaflet-control-zoom-in')).toHaveLength(1);
    expect(componentRender.find('a.leaflet-control-zoom-out')).toHaveLength(1);
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
  it('Should successfully call onViewportChange of Leaflet', async () => {
    await actions(component, () => {
      let props: any = component.find('Map').props();

      props.onViewportChange({zoom: 12});
    });
  });
  it('Should successfully call onCreated of EditControlFeatureGroup', async () => {
    await actions(component, () => {
      let props: any = component.find('EditControlFeatureGroup').props();
      let evt = {
        layer: {
          getLatLng: () => {
            return {
              lat: 25,
              lng: 121
            };
          }
        }
      };

      props.onCreated(evt);
    });
  });
});
