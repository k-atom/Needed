import css from "../css/app.css"

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Page
import Header from "./components/header";

// JS
import loadScript from '../vendor/loadJS_module';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/needed" component={Needed}/>
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
        {loadScript('/js/needed/needed.js')}
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

// class Hello extends React.Component {
//   render() {
//     return "Hello Recat";
//   }
// }

let mountNode = document.getElementById("k-browser");
ReactDOM.render(<App />, mountNode);
