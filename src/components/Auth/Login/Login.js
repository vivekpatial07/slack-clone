//error handling styling as well as some logic remaining
//active css class border none remainig

import React, { Component } from "react";
import classes from "./Login.css";
import firebase from "../../../firebase";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import { Link } from "react-router-dom";
class Login extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    error: "",
  };
  //controlled inputs
  changeHandler = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    let updatedState = { ...this.state };
    updatedState[name] = val;
    this.setState(updatedState);
    ////////////////////////////////////
    //        Another Way
    // this.setState({ state: updatedState });
    // [name]: val,
    // this.setState({ [name]: val });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    if (this.isFormValid(this.state)) {
      if (!this.state.loading) {
        this.setState({ loading: true });
        //For signing up the user with email and password via firebase
        firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then((user) => {
            this.setState({ loading: false });
          })
          .catch((err) => {
            this.setState({ error: err.message, loading: false });
          });
      }
    } else {
      this.setState({ error: "Please Try Again" });
    }
  };

  isFormValid = ({ email, password }) => email && password;

  render() {
    return (
      <div className={classes.Login}>
        <div>{this.state.error}</div>
        <h1>Slack-Clone </h1>
        <CodeRoundedIcon fontSize="large" />
        <form className={classes.Form} onSubmit={this.onSubmitHandler}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Your Mail"
            className={classes.Input}
            name="email"
            onChange={this.changeHandler}
          />
          <input
            type="password"
            placeholder="Your Password"
            className={classes.Input}
            name="password"
            onChange={this.changeHandler}
          />
          <button
            color="primary"
            variant="contained"
            className={classes.Button}
            disabled={this.state.loading}
          >
            Login
          </button>
        </form>
        <div className={classes.LoginCard}>
          <div>
            New User?
            <Link to="/register">
              <button className={classes.Button}>Register</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
