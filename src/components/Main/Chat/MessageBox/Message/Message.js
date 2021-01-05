import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "../../../../../firebase";
class Message extends Component {
  state = {
    messages: [],
    onMessageRef: firebase.database().ref("messages"),
  };
  componentDidMount() {
    setTimeout(this.displayMessages, 5000);
  }
  displayMessages = () => {
    this.state.onMessageRef.child(this.props.currentChannel.id).on(
      "child_added",
      (snapshot) => {
        const updatedMessages = [...this.state.messages];
        updatedMessages.push(snapshot.val());
        console.log(updatedMessages);
        this.setState({ messages: updatedMessages });
      },
      (err) => {
        console.log(err);
      }
    );
  };
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.currentChannel && prevProps !== prevState) {
  //     this.props.messageRef.child(this.props.currentChannel.id).on(
  //       "child_added",
  //       (snapshot) => {
  //         const updatedMessages = [...this.state.messages];
  //         updatedMessages.push(snapshot.val());
  //         console.log(updatedMessages);
  //         this.setState({ messages: updatedMessages });
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  //   }
  // }
  render() {
    const showMessages = this.state.messages.map((message) => {
      // console.log({ message });
      return <div key={message.timestamp}>{message.content}hey</div>;
    });
    return (
      <div>
        Message
        {showMessages}
        <div>{this.state.messages.length > 0 ? showMessages : null}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentChannel: state.channel.currentChannel,
  };
};
export default connect(mapStateToProps)(Message);
