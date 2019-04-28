let loadScript = function(src) {
  let tag = document.createElement('script');
  tag.async = false;
  tag.src = src;
  document.getElementsByTagName('head')[0].appendChild(tag);
};

export default loadScript;
