import React, { Component } from "react";
import classes from "./App.css";
import { Switch, Route, withRouter } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Main from "./components/Main/Main";
import { connect } from "react-redux";
import { setUser, removeUser } from "./store/actions";
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
      } else {
        this.props.history.push("/login");
        this.props.removeUser();
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
          <Route path="/" component={Main} exact />
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
    currentUser: state.user.currentUser,
  };
};
export default connect(mapStateToProps, { setUser, removeUser })(
  withRouter(App)
);
