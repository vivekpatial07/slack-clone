import React, { Component } from "react";
import classes from "./Login.css";
class Login extends Component {
  state = {
    email: "",
    password: "",
  };
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
    console.log(this.state);
  };
  render() {
    return (
      <div className={classes.Login}>
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
          <button className={classes.Button}>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
