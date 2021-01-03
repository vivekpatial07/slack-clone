import React, { Component } from "react";
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
    return (
      <div className={classes.SidePanel}>
        <h2>Slack-Clone</h2>
        {/* <div>
          <img src={} />
          <p>Welcome! {}</p>
        </div> */}
        <button onClick={this.signOutHandler}>Sign Out!</button>
      </div>
    );
  }
}

export default SidePanel;
