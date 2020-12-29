import React, { Component } from "react";
import classes from "./Register.css";
import firebase from "../../../firebase";
class Register extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    passwordConfirm: "",
    errors: [],
    loading: false,
  };
  changeHandler = (e) => {
    const updatedState = { ...this.state };
    updatedState[e.target.name] = e.target.value;
    this.setState(updatedState);
  };
  submitHandler = (e) => {
    e.preventDefault();
    if (this.isFormValid(this.state)) {
      console.log("isform valid");
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          this.setState({ errors: [err.message] });
        });
    }
  };
  isFormValid = ({ username, password, passwordConfirm }) => {
    return (
      this.isUserNameValid(username) &&
      this.isPasswordValid(password, passwordConfirm)
    );
  };
  isUserNameValid = (username) => {
    if (username.length < 5) {
      const error = "Username must be more than 5 characters";
      let updatedErrors = [error];
      if (updatedErrors.includes(error)) {
        updatedErrors.concat(error);
        console.log("di");
      }
      this.setState({ errors: updatedErrors });
      console.log(this.state.errors);
    } else {
      this.setState({ errors: [] });
      console.log(this.state.errors);
      return true;
    }
  };
  isPasswordValid = (pass, passConfirm) => {
    if (pass !== passConfirm || pass.length < 7 || passConfirm.length < 7) {
      const error = "Password Invalid!";
      let updatedErrors = [error];
      if (updatedErrors.includes(error)) {
        updatedErrors.concat(error);
        console.log("di");
      }
      this.setState({ errors: updatedErrors });
      console.log(this.state.errors);
    } else {
      this.setState({ errors: [] });
      return true;
    }
  };
  render() {
    return (
      <div className={classes.Register}>
        <div>{this.state.errors}</div>
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
