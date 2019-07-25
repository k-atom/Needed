import "../../css/components/head.scss";

import * as React from "react";
import { Link } from "react-router-dom";

interface Props {
  SetSidebarOpen: (event: boolean) => void
}

class Header extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);

    this.SetSidebarOpen = this.SetSidebarOpen.bind(this);
  }

  SetSidebarOpen() {
    this.props.SetSidebarOpen(true);
  }

  render() {
    return (
      <nav className="navbar navbar-light head__navbar">
        <div className="navbar-brand icon-block">
          <i
            className="material-icons icon ripple"
            onClick={this.SetSidebarOpen}
            >menu</i>
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
