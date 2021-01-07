import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./MessageBox.css";
import Message from "./Message/Message";
import firebase from "../../../../firebase";
import { setChannel } from "../../../../store/actions";
import Modal from "./Modal/Modal";
import uuidv4 from "uuid/v4";
class MessageBox extends Component {
  state = {
    uploadTask: null,
    uploadState: "",
    showModal: false,
    messages: [],
    message: "",
    onMessageRef: firebase.database().ref("messages"),
    onStorageRef: firebase.storage(),
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
    // this.setState({uploadTask:this.state.onStorageRef(filePath).put(this.state.file)

    const filePath = `chat/public/${uuidv4()}.jpg`;
    // })
    const imageUpload = this.state.onStorageRef
      .ref(filePath)
      .put(this.state.file);
    imageUpload.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
        console.log(this.state);
      },
      (err) => {
        console.log(err);
      },
      () => {
        //understanding part
        //for getting url of the image uploaded
        imageUpload.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          console.log(downloadUrl);
          const file = {
            ...this.state.file,
            url: downloadUrl,
          };
          this.setState({ file }, () => {
            const messageData = {
              // timestamp: firebase.database().ServerValue.TIMESTAMP,
              timestamp: Math.random() * 7777777,
              url: file.url,
              user: {
                sender: this.props.currentUser.displayName,
                avatar: this.props.currentUser.photoURL,
                id: this.props.currentUser.uid,
              },
            };

            this.state.onMessageRef
              .child(this.props.currentChannel.id)
              .push()
              .set(messageData)
              .then(() => {
                //will clear up message box later
              });
          });
        });
      }
    );
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
