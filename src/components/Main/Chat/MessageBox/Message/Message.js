import { Avatar, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "../../../../../firebase";
import { setChannel } from "../../../../../store/actions/index";
import classes from "./Message.css";
class Message extends Component {
  state = {
    key: null,
    messages: [],
    onChannelRef: firebase.database().ref("channels"),
    onMessageRef: firebase.database().ref("messages"),
  };
  // componentDidMount() {
  //   setTimeout(this.displayMessages, 5000);
  //   // this.displayMessages();
  //   this.setState({ key: Math.random() });
  // }
  // componentDidUpdate() {
  //   let count = 0;
  //   if (count < 7) {
  //     this.displayMessages();
  //     count++;
  //   }
  // }
  displayMessages = () => {
    // this.props.setChannel();
    const messagesempty = [];
    this.setState({ messages: messagesempty });
    console.log(this.state.messages);

    this.state.onMessageRef.child(this.props.currentChannel.id).on(
      "child_added",
      (snapshot) => {
        const updatedMessages = [...this.state.messages];
        updatedMessages.push(snapshot.val());
        console.log(this.state.messages);
        this.setState({ messages: updatedMessages });
      },
      (err) => {
        console.log(err);
      }
    );
  };
  render() {
    const showMessages = this.state.messages.map((message, i) => {
      // console.log({ message });
      return (
        <div key={message.timestamp} className={classes.Message}>
          <Avatar src={message.user.avatar} />
          <strong style={{ padding: "5px !important" }}>
            {message.user.sender}
          </strong>
          -
          {message.content ? (
            <Typography>{message.content}</Typography>
          ) : (
            <img src={message.url} style={{ height: 70 }} alt=" file" />
          )}
        </div>
      );
    });
    return (
      <div>
        <button onClick={() => this.displayMessages()}>Display Message</button>

        {showMessages}
        {/* <div>{this.state.messages.length > 0 ? showMessages : null}</div> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentChannel: state.channel.currentChannel,
  };
};
export default connect(mapStateToProps, { setChannel })(Message);
