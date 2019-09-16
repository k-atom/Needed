import * as geo from '../../ts/lib/geolocation';


describe('geoLocation', () => {
  it('Should have geoLocation', () => {
    geo.createGeolocation().then(e => {
      expect(typeof e).toBe('object');
    });
  });
  it('Should have not geoLocation', () => {
    (window.navigator.geolocation as any) = undefined;
    geo.createGeolocation().catch(e => {
      expect(e).toEqual('此瀏覽器不支援地理定位功能!');
    });
  });
});
