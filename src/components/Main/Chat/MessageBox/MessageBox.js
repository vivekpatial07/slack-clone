import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./MessageBox.css";
import Message from "./Message/Message";
import firebase from "../../../../firebase";
import { setChannel } from "../../../../store/actions";
import Modal from "./Modal/Modal";
class MessageBox extends Component {
  state = {
    showModal: false,
    messages: [],
    message: "",
    onMessageRef: firebase.database().ref("messages"),
    onStorageRef: firebase.storage().ref("/users"),
    file: null,
    fileData: null,
  };
  sendMessage = () => {
    // const message = this.state.message;
    const messageData = {
      // timestamp: firebase.database().ServerValue.TIMESTAMP,
      timestamp: Math.random() * 7777777,
      content: this.state.message,
      user: {
        sender: this.props.currentUser.displayName,
        avatar: this.props.currentUser.photoURL,
        id: this.props.currentUser.uid,
      },
    };
    // this.state.onMessageRef.push().key;
    this.state.onMessageRef
      .child(this.props.currentChannel.id)
      .push()
      .set(messageData)
      .then(() => {
        //will clear up message box later
      });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // componentDidMount() {
  //   // setChannel(this.props.currentChannel);

  //   if (this.props.currentChannel) {
  //     this.state.onMessageRef.child(this.props.currentChannel.id).on(
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
  imagechangeHandler = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    this.setState({ file: file });
    // console.log(this.state);
  };
  uploadMessage = () => {
    this.setState({ showModal: true });
  };
  modalClose = (e) => {
    e.preventDefault();
    this.setState({ showModal: false });
  };
  uploadImage = (e) => {
    e.preventDefault();
    console.log("uploading");
    //let file
    // this.state.onStorageRef.child(`/images/${this.state.file.name}`).put();
    const imageUpload = this.state.onStorageRef
      .child(`/images/${this.state.file.name}`)
      .put(this.state.file);
    imageUpload.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
        console.log(this.state);
      },
      (err) => {
        console.log(err);
      }
      // () => {
      //   this.state.onStorageRef
      //     .child(this.state.file.name)
      //     .getDownloadURL()
      //     .then((firebaseURL) => {
      //       let file = this.state.file;
      //       file.imgUrl = firebaseURL;
      //       this.setState({ file: file });
      //     });
      // }
    );
    // .put().then(console.log('file uploaded));
  };
  render() {
    return (
      <div className={classes.MessageBox}>
        <Message
          messageRef={this.state.onMessageRef}
          // currentChannel={this.props.currentChannel}
        />
        <input
          type="text"
          placeholder="Type Something"
          name="message"
          onChange={this.changeHandler}
        />
        <div>
          <button onClick={this.sendMessage}>Send</button>
          <button onClick={this.uploadMessage}>Upload</button>
        </div>
        {this.state.showModal ? (
          <Modal
            changeHandler={this.imagechangeHandler}
            uploadImage={this.uploadImage}
            closeModal={this.modalClose}
          />
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    currentChannel: state.channel.currentChannel,
  };
};
export default connect(mapStateToProps, { setChannel })(MessageBox);
