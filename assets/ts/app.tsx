import 'antd/dist/antd.css';
import "../css/app.scss";

// NPM module
import * as React from "react";
import { Suspense, lazy } from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Components
import Header from "./components/header";
import Sidebar from "./components/sidebar";

// Page
const Needed = lazy(() => import('./needed/needed'));

interface State {
  sidebarOpen: boolean
}

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      sidebarOpen: false
    };

    this.SetSidebarOpen = this.SetSidebarOpen.bind(this);
  }

  SetSidebarOpen(open: boolean): void {
    this.setState({
      sidebarOpen: open
    });
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
            <Suspense fallback={<div>Loading...</div>}>
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={Login}/>
              <Route path="/needed" component={Needed}/>
            </Suspense>
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

let mountNode = document.getElementById("n-browser");
ReactDOM.render(<App />, mountNode);

export default App;
