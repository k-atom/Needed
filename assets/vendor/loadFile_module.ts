import cdn from './cdn';

const loadedFile = [];
const loadCDN = function(request: string) {
  if (cdn[request] !== undefined && Object.keys(cdn[request]).length !== 0) {
    if (loadedFile.indexOf(request) === -1) {
      loadedFile.push(request);

      if (cdn[request].link !== undefined && cdn[request].link.length != 0) {
        cdn[request].link.forEach((i: any) => {
          loadCSS(i);
        });
      }

      if (cdn[request].script !== undefined && cdn[request].script.length != 0) {
        cdn[request].script.forEach((i: any) => {
          loadScript(i);
        });
      }
    }
  }
};

const loadFile = function(src: string) {
  let i: object = {};
  i['src'] = 'js/' + src;
  loadScript(i);
};

const loadCSS = function(i: any) {
  let el = document.createElement('link');

  if (i.crossorigin !== undefined)
    el.crossOrigin = '' || i.crossorigin;
  if (i.href !== undefined)
    el.href = '' || i.href;
  if (i.integrity !== undefined)
    el.integrity = '' || i.integrity;
  if (i.rel !== undefined)
    el.rel = '' || i.rel;

  el.onload = () => {
    console.log(1)
  };
  el.onerror = () => {
    console.log(2)
  }

  document.getElementsByTagName('head')[0].appendChild(el);
};

const loadScript = function(i: any) {
  let el = document.createElement('script');

  if (i.crossorigin !== undefined)
    el.crossOrigin = '' || i.crossorigin;
  if (i.src !== undefined)
    el.src = '' || i.src;
  if (i.integrity !== undefined)
    el.integrity = '' || i.integrity;

  el.onload = () => {
  };

  document.getElementsByTagName('head')[0].appendChild(el);
};

export { loadCDN, loadFile };
