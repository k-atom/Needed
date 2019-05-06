import "../../css/head.scss";

import * as React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light head__navbar">
        <div className="navbar-brand menu">
          <i className="material-icons hamburger_menu">menu</i>
        </div>
        <Link className="navbar-brand" title="Needed" to="/">
          <img className="head__logo" src="/images/K_Logo_160x160.png" alt="Needed Logo" />
          Needed
        </Link>
      </nav>
    )
  }
}

export default Header;
