import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const mockGeolocation = {
  getCurrentPosition: jest.fn()
    .mockImplementationOnce((success, error) => Promise.resolve(success({
      coords: {
        latitude: 51.1,
        longitude: 45.3
      }
    })))
    .mockImplementationOnce((success, error) => Promise.resolve(error({
      code: 1,
      message: "User denied Geolocation"
    }))),
  watchPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;
