import React, { Component } from "react";
import classes from "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Chat from "./components/Chat/Chat";

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Router>
          <Switch>
            <Route path="/" component={Chat} exact />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
