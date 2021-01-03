import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./SidePanel.css";
import firebase from "../../../firebase";
export class SidePanel extends Component {
  signOutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log(`Sign out successful`);
      })
      .catch((err) => console.log(err));
  };
  render() {
    console.log(this.props.avatar);
    return (
      <div className={classes.SidePanel}>
        <h2>Slack-Clone</h2>
        <div>
          <img src={this.props.avatar} alt="avatar" />
          <p>Welcome! {this.props.username}</p>
        </div>
        <button onClick={this.signOutHandler}>Sign Out!</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.user.currentUser.displayName,
    avatar: state.user.currentUser.photoURL,
  };
};
export default connect(mapStateToProps)(SidePanel);
