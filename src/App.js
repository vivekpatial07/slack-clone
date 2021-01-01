import React, { Component } from "react";
import classes from "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Chat from "./components/Chat/Chat";
import { connect } from "react-redux";
import { setUser } from "./store/actions";
import firebase from "./firebase";
import Spinner from "./components/UI/Spinner/Spinner";

class App extends Component {
  componentDidMount() {
    //for checking if user is signed in and do things if signed in!
    firebase.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        // url loading but page not loading
        // will fix the issue later
        this.props.history.push("/");
        //Dispatching Action
        this.props.setUser(user);
      }
    });
  }
  render() {
    return this.props.loading ? (
      <Spinner />
    ) : (
      <div className={classes.App}>
        {/* Just Routing */}
        <Switch>
          <Route path="/" component={Chat} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    );
  }
}
//
//connecting react with redux using connect
//passing setUser action
const mapStateToProps = (state) => {
  return {
    loading: state.user.isLoading,
  };
};
export default connect(mapStateToProps, { setUser })(withRouter(App));
