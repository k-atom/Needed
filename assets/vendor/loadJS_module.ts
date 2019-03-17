let loadScript = function(src: string) {
  let tag = document.createElement('script');
  tag.async = false;
  tag.src = src;
  document.getElementsByTagName('body')[0].appendChild(tag);
  console.log(a);
};

let a = {
  a: () => {console.log(1);}
}

export default loadScript;
