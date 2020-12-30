import React, { Component } from "react";
import classes from "./Login.css";
import firebase from "../../../firebase";
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
    console.log(updatedState);
    ////////////////////////////////////
    //        Another Way
    // this.setState({ state: updatedState });
    // [name]: val,
    // this.setState({ [name]: val });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    if (!this.state.loading) {
      console.log(this.state);
      this.setState({ loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
          console.log(user);
          this.setState({ loading: false });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ error: err.message, loading: false });
        });
    }
  };
  render() {
    return (
      <div className={classes.Login}>
        <div>{this.state.error}</div>
        <h1>Login</h1>
        <form className={classes.Form} onSubmit={this.onSubmitHandler}>
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
          <button className={classes.Button} disabled={this.state.loading}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
