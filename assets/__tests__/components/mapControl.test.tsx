import * as React from 'react';
import { mount } from 'enzyme';

import MapControl from '../../ts/components/mapControl';

let lat: number = 25.032697;
let lng: number = 121.563086;
let position:[number, number] = [lat, lng];

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

describe('MapControl', () => {
  const component = mount(<MapControl {...previous}/>);

  it('Check node of MapComponent', () => {
    let reactWrapper: any;

    // Main container
    expect(component.find('div.mapControl')).toHaveLength(1);

    // Button for set position
    reactWrapper = component.find('Button');
    expect(reactWrapper).toHaveLength(1);
    expect(reactWrapper.prop('title')).toEqual('設置位置');

    // Icon of button for set position
    expect(component.find('i.anticon-environment')).toHaveLength(1);

    // Note text of button for set position
    expect(component.find('div.container').text()).toEqual('點擊圖示來設置位置');

    // Dividers
    expect(component.find('Divider')).toHaveLength(1);

    // Pre tab of InputNumber
    reactWrapper = component.find('label');
    expect(reactWrapper).toHaveLength(2);
    expect(reactWrapper.at(0).text()).toEqual('lat :');
    expect(reactWrapper.at(1).text()).toEqual('lng :');

    // InputNumber of antd
    reactWrapper = component.find('input.ant-input-number-input');
    expect(reactWrapper).toHaveLength(2);
    expect(reactWrapper.at(0).prop('id')).toEqual('lat');
    expect(reactWrapper.at(1).prop('id')).toEqual('lng');
    expect(reactWrapper.at(0).prop('placeholder')).toEqual('Input Latitude');
    expect(reactWrapper.at(1).prop('placeholder')).toEqual('Input Longitude');
    expect(reactWrapper.at(0).prop('max')).toEqual(90);
    expect(reactWrapper.at(1).prop('max')).toEqual(180);
    expect(reactWrapper.at(0).prop('min')).toEqual(-90);
    expect(reactWrapper.at(1).prop('min')).toEqual(-180);

    expect(component.html()).toMatchSnapshot();
  });
  it('Determine latitude input', () => {
    let reactWrapper: any;

    reactWrapper = component.find('input.ant-input-number-input').at(0);

    // If don't use onChange, need to focus first
    // Then press Enter to call back onPressEnter
    reactWrapper.simulate('focus');

    // If value is Equal
    reactWrapper.simulate('keydown', { keyCode: 13 });

    // If value is out of range
    reactWrapper.simulate('change', { target: { value: '91' } });
    reactWrapper.simulate('keydown', { keyCode: 13 });

    reactWrapper.simulate('change', { target: { value: '-91' } });
    reactWrapper.simulate('keydown', { keyCode: 13 });

    // If value is NaN
    reactWrapper.simulate('change', { target: { value: 'isNaN' } });
    reactWrapper.simulate('keydown', { keyCode: 13 });

    // If value is in range
    reactWrapper.simulate('change', { target: { value: '90' } });
    reactWrapper.simulate('keydown', { keyCode: 13 });

    reactWrapper.simulate('change', { target: { value: '-90' } });
    reactWrapper.simulate('keydown', { keyCode: 13 });
  });
  it('Determine longitude input', () => {
    let reactWrapper: any;

    reactWrapper = component.find('input.ant-input-number-input').at(1);

    // If don't use onChange, need to focus first
    // Then press Enter to call back onPressEnter
    reactWrapper.simulate('focus');

    // If value is Equal
    reactWrapper.simulate('keydown', { keyCode: 13 });

    // If value is out of range
    reactWrapper.simulate('change', { target: { value: '181' } });
    reactWrapper.simulate('keydown', { keyCode: 13 });

    reactWrapper.simulate('change', { target: { value: '-181' } });
    reactWrapper.simulate('keydown', { keyCode: 13 });

    // If value is NaN
    reactWrapper.simulate('change', { target: { value: 'isNaN' } });
    reactWrapper.simulate('keydown', { keyCode: 13 });

    // If value is in range
    reactWrapper.simulate('change', { target: { value: '180' } });
    reactWrapper.simulate('keydown', { keyCode: 13 });

    reactWrapper.simulate('change', { target: { value: '-180' } });
    reactWrapper.simulate('keydown', { keyCode: 13 });
  });
});
