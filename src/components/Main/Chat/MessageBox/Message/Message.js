import { Avatar, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "../../../../../firebase";
import { setChannel } from "../../../../../store/actions/index";
import classes from "./Message.css";
class Message extends Component {
  state = {
    messages: [],
    onPrivateMessagesRef: firebase.database().ref("privateMessages"),
    isLoading: true,
    onChannelRef: firebase.database().ref("channels"),
    onMessageRef: firebase.database().ref("messages"),
  };

  getMessageRef = () => {
    return this.props.isPrivate
      ? this.state.onPrivateMessagesRef
      : this.state.onMessageRef;
  };
  componentDidMount() {
    this.displayMessages();
    // setTimeout(this.displayMessages, 2700);
    // this.setState({ isLoading: false });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentChannel !== this.props.currentChannel) {
      this.displayMessages();

      // setTimeout(this.displayMessages, 700);
      // this.displayMessages;
    }
    // this.setState({ isLoading: false });
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.currentChannel !== nextProps.currentChannel ||
      this.state !== nextState
    );
  }
  displayMessages = () => {
    const messagesempty = [];
    this.setState({ messages: messagesempty });
    // console.log(this.getMessageRef());
    if (this.props.currentChannel) {
      // const updatedMessages = [...this.state.messages];
      const updatedMessages = [];
      const ref = this.getMessageRef();
      ref.child(this.props.currentChannel.id).on(
        "child_added",
        (snapshot) => {
          updatedMessages.push(snapshot.val());
          this.setState({ messages: updatedMessages, isLoading: true }, () => {
            console.log(this.state.messages);
          });
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };
  render() {
    const showMessages = this.state.messages.map((message, i) => {
      return (
        <div key={message.timestamp} className={classes.Message}>
          <Avatar
            src={message.user.avatar}
            style={{ height: "27px", width: "27px", borderRadius: "27px" }}
          />
          <Typography variant="subtitle2">{message.user.sender}</Typography>-
          {message.content ? (
            <Typography variant="body1">{message.content}</Typography>
          ) : (
            <img src={message.url} style={{ height: 270 }} alt=" file" />
          )}
        </div>
      );
    });
    return (
      <div>
        {!this.state.isLoading ? <p>loading...</p> : showMessages}
        {/* <div>{this.state.messages.length > 0 ? showMessages : null}</div> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentChannel: state.channel.currentChannel,
    isPrivate: state.channel.isPrivate,
  };
};
export default connect(mapStateToProps, { setChannel })(Message);
