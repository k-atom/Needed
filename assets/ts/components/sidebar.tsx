import "../../css/components/sidebar.scss";

import * as React from "react";
import { Link } from "react-router-dom";

interface Props {
  opened?: boolean;
  SetSidebarOpen: (open: boolean) => void;
}

class Sidebar extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);

    this.SetSidebarOpen = this.SetSidebarOpen.bind(this);
  }

  SetSidebarOpen() {
      this.props.SetSidebarOpen(false);
  }

  render() {
    return (
      <div className="sidebar" data-opened={!!this.props.opened || false}>
        <div
          className="sidebar__background"
          onClick={this.SetSidebarOpen}
          >
        </div>
        <div className="sidebar__container">
          <Container SetSidebarOpen={this.SetSidebarOpen}/>
        </div>
        {this.props.children}
      </div>
    );
  }
}

interface ContainerProps {
  SetSidebarOpen: (open: boolean) => void
}

class Container extends React.Component<ContainerProps, {}> {
  constructor(props: any) {
    super(props);

    this.SetSidebarOpen = this.SetSidebarOpen.bind(this);
  }

  SetSidebarOpen() {
      this.props.SetSidebarOpen(false);
  }

  render() {
    return (
      <div>
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
        <div className="navbar list">
          <Link className="navbar-brand item ripple" title="Home" to="/">
            <div className="navbar-brand icon-block">
              <i
                className="material-icons icon"
                >home</i>
            </div>
            <div className="text">
              首頁
            </div>
          </Link>
          <Link className="navbar-brand item ripple" title="Needed" to="/needed">
            <div className="navbar-brand icon-block">
              <i
                className="material-icons icon"
                >add_box</i>
            </div>
            <div className="text">
              Needed
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Sidebar;
