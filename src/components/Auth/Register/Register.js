import React, { Component } from "react";
import classes from "./Register.css";
// for authentication
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
  //for controlled component(input)
  changeHandler = (e) => {
    const updatedState = { ...this.state };
    updatedState[e.target.name] = e.target.value;
    this.setState(updatedState);
  };
  //for form submission
  submitHandler = (e) => {
    e.preventDefault();
    if (this.isFormValid(this.state)) {
      console.log("isform valid");
      //for created users via email and pass.
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          //for adding and showing firebase errors on the form
          this.setState({ errors: [err.message] });
        });
    }
  };
  //to check the form validity
  isFormValid = ({ username, password, passwordConfirm }) => {
    return (
      //sub functions to make code easy to debug
      this.isUserNameValid(username) &&
      this.isPasswordValid(password, passwordConfirm)
    );
  };
  //sub function 1 for checking usernameValidation
  isUserNameValid = (username) => {
    if (username.length < 5) {
      const error = "Username must be more than 5 characters";
      //dont know why its(this.state.errors) array just went with the flow
      let updatedErrors = [error];
      //for preventing same errors getting added in the array again
      if (updatedErrors.includes(error)) {
        updatedErrors.concat(error);
      }
      this.setState({ errors: updatedErrors });
      console.log(this.state.errors);
    } else {
      //for removing errors from the array so that nothing is shown on the browser
      this.setState({ errors: [] });
      console.log(this.state.errors);
      return true;
    }
  };
  //sub function 2 for checking passwordValidation
  isPasswordValid = (pass, passConfirm) => {
    //refer comments of sub fn 1 for help(if any needed)
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
        {/* to show the validation error */}
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
