import 'antd/dist/antd.css';
import "../css/app.scss";

// NPM module
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Components
import Header from "./components/header";
import Sidebar from "./components/sidebar";

// Page

// JS
import loadScript from '../vendor/loadJS_module';

interface State {
  sidebarOpen: boolean
}

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      sidebarOpen: true
    };

    this.SetSidebarOpen = this.SetSidebarOpen.bind(this);
  }

  SetSidebarOpen(open: boolean): void {
    this.setState({
      sidebarOpen: open
    });
    console.log(open)
  }

  render() {
    const sidebarProps = {
      opened: this.state.sidebarOpen
    };

    return (
      <Router>
        <div className="">
          <Header SetSidebarOpen={this.SetSidebarOpen}/>
          <div className="n-container">
            <p>{this.state.sidebarOpen}</p>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/needed" component={Needed}/>
          </div>
          <Sidebar SetSidebarOpen={this.SetSidebarOpen} {...sidebarProps}/>
        </div>
      </Router>
    )
  }
}

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello React!</h1>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/needed">Needed</Link>
      </div>
    )
  }
}

class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello Boring Login Page!</h1>
        <Link to="/">Home</Link>
      </div>
    )
  }
}

class Needed extends React.Component {
  render() {
    return (
      <div>
        <h1>What do you need ?</h1>
        {loadScript('/js/needed/needed.js')}
      </div>
    )
  }
}

let mountNode = document.getElementById("n-browser");
ReactDOM.render(<App />, mountNode);

export default App;
