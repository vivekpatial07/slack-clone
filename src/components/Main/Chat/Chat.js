import React, { Component } from "react";
import classes from "./Chat.css";
import MessageBox from "./MessageBox/MessageBox";
export class Chat extends Component {
  render() {
    return (
      <div className={classes.Chat}>
        <MessageBox />
      </div>
    );
  }
}

export default Chat;
