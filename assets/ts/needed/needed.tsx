import * as React from "react";
import loadScript from '../../vendor/loadJS_module';

class Needed extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello Boring Login Page!</h1>
        <script type="text/javascript" src="/js/needed/needed.js" async></script>
        {loadScript('/js/needed/needed.js')}
      </div>
    )
  }
}

export default Needed;
