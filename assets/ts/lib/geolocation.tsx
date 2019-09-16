const createGeolocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      let geolocation = window.navigator.geolocation;
      resolve(geolocation);
    }
    else {
      reject('此瀏覽器不支援地理定位功能!');
    }
  });
}

export {
 createGeolocation
};
