import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
const Root = () => (
  <Router>
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </Router>
);
ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
