/**
  * Import style
  */
import '../../css/components/mapControl.scss';

/**
  * Import modules
  */
import * as React from "react";
import { Button, Divider, Icon, InputNumber } from 'antd';


interface MapControlPrevious {
  lat: number,
  lng: number,
  position: [number, number],
  fn: {
    setLat: (lat: number) => void,
    setLng: (lng: number) => void,
    setPosition: (arr: [number, number]) => void,
    _drawMarker: (e: any) => void;
  }
}


/**
  * Set alias for React hook function
  */
const useEffect = React.useEffect;
const useState = React.useState;


/**
  * MapControl hook
  */
function MapControl(previous: MapControlPrevious) {
  const [position, setPosition] = useState<[number, number]>(previous.position);

  const checkLatRange = (value: number | string) => {
    value = +value;
    return !isNaN(value) && value >= -90 && value <= 90;
  };

  const checkLngRange = (value: number | string) => {
    value = +value;
    return !isNaN(value) && value >= -180 && value <= 180;
  };

  const changePosition = (e: any) => {
    switch (e.target.id) {
      case 'lat':
        +e.target.value == position[0] ||
        !checkLatRange(e.target.value) ||
        previous.fn.setPosition([Number(e.target.value), position[1]]);
        break;
      case 'lng':
        +e.target.value == position[1] ||
        !checkLngRange(e.target.value) ||
        previous.fn.setPosition([position[0], Number(e.target.value)]);
        break;
    }
  };


  useEffect(() => {
    setPosition(previous.position);
  }, [previous.position]);

  return (
    <div className="mapControl">
      <div className="items">
        <div className="container">
          <div className="row">
            <Button className="btn" title="設置位置" onClick={previous.fn._drawMarker}>
              <Icon type="environment" />
            </Button>
          </div>
          <div className="row">
            <p>點擊圖示來設置位置</p>
          </div>
        </div>
        <Divider />
        <div>
          <div className="row">
            <label>lat :</label>
            <InputNumber
              id={'lat'}
              max={90}
              min={-90}
              onPressEnter={changePosition}
              placeholder="Input Latitude"
              precision={6}
              step={0.000001}
              value={position[0]}
            />
          </div>
          <div className="row">
            <label>lng :</label>
            <InputNumber
              id={'lng'}
              max={180}
              min={-180}
              onPressEnter={changePosition}
              placeholder="Input Longitude"
              precision={6}
              step={0.000001}
              value={position[1]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapControl;
