import React, { Component } from "react";
import classes from "./Register.css";
import firebase from "../../../firebase";
class Register extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    passwordConfirm: "",
  };
  changeHandler = (e) => {
    const updatedState = { ...this.state };
    updatedState[e.target.name] = e.target.value;
    this.setState(updatedState);
  };
  submitHandler = (e) => {
    e.preventDefault();
    //console.log(this.state);
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  render() {
    return (
      <div className={classes.Register}>
        <h1>Register</h1>
        <form onSubmit={this.submitHandler} className={classes.RegisterForm}>
          <input
            name="username"
            onChange={this.changeHandler}
            type="text"
            placeholder="Username"
            className={classes.Input}
          />
          <input
            name="email"
            onChange={this.changeHandler}
            type="email"
            placeholder="Your email"
            className={classes.Input}
          />
          <input
            name="password"
            onChange={this.changeHandler}
            type="password "
            placeholder="password"
            className={classes.Input}
          />
          <input
            name="passwordConfirm"
            onChange={this.changeHandler}
            type="password "
            placeholder="Confirm password"
            className={classes.Input}
          />
          <button className={classes.Button}>Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
