//error handling styling as well as some logic remaining
//active css class border none remainig

import React, { Component } from "react";
import classes from "./Register.css";
import firebase from "../../../firebase";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import { Link } from "react-router-dom";
//for generating hash
import md5 from "md5";

class Register extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    passwordConfirm: "",
    errors: [],
    loading: false,
    //for database reference(setting to users)->this will refer to the user node in the database
    userRef: firebase.database().ref("users"),
  };
  //for controlled component(input)
  changeHandler = (e) => {
    // const updatedState = { ...this.state };
    // updatedState[e.target.name] = e.target.value;
    // this.setState(updatedState);
    this.setState({ [e.target.name]: e.target.value });
  };
  //for form submission
  submitHandler = (e) => {
    e.preventDefault();

    if (this.isFormValid(this.state)) {
      console.log("isform valid");
      if (!this.state.loading) {
        console.log(`loading...`);
        this.setState({ loading: true });

        firebase
          //for created users via email and pass.
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then((createdUser) => {
            // console.log(createdUser);
            createdUser.user
              .updateProfile({
                displayName: this.state.username,
                photoURL: `http://gravatar.com/avatar/${md5(
                  createdUser.user.email
                )}?d=identicon`,
              })
              .then(() => {
                //calling saveUser function and passing created user as param
                this.saveUser(createdUser).then(() => {
                  console.log(`user saved`);
                });
              })
              .catch((err) => {
                console.log(err);
                this.setState({ errors: [err] });
              });
          })
          .then(() => {
            console.log("Signed In!");
            this.setState({ loading: false });
          })
          .catch((err) => {
            //for adding and showing firebase errors on the form
            this.setState({ errors: [err.message], loading: false });
          });
      }
    }
  };
  //saving user on database
  saveUser = (userCreated) => {
    //appending a child node as uid on users node and then adding two sub-nodes as name and avatar
    return this.state.userRef.child(userCreated.user.uid).set({
      name: userCreated.user.displayName,
      avatar: userCreated.user.photoURL,
    });
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
      // console.log(this.state.errors);
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
        <h1>Slack-Clone</h1>
        <CodeRoundedIcon fontSize="large" />

        <form onSubmit={this.submitHandler} className={classes.RegisterForm}>
          <h2>Register</h2>
          <input
            value={this.state.username}
            name="username"
            onChange={this.changeHandler}
            type="text"
            placeholder="Username"
            className={classes.Input}
          />
          <input
            value={this.state.email}
            name="email"
            onChange={this.changeHandler}
            type="email"
            placeholder="Your email"
            className={classes.Input}
          />
          <input
            value={this.state.password}
            name="password"
            onChange={this.changeHandler}
            type="password"
            placeholder="password"
            className={classes.Input}
          />
          <input
            value={this.state.passwordConfirm}
            name="passwordConfirm"
            onChange={this.changeHandler}
            type="password"
            placeholder="Confirm password"
            className={classes.Input}
          />

          <button className={classes.Button} disabled={this.state.loading}>
            Register
          </button>
        </form>
        <div className={classes.RegisterCard}>
          <div>
            Already a User?
            <Link to="/login">
              <button className={classes.Button}>Login</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
