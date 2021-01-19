import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./MessageBox.css";
import Message from "./Message/Message";
import firebase from "../../../../firebase";
import { setChannel, starChannel } from "../../../../store/actions";
import Modal from "./Modal/Modal";
import uuidv4 from "uuid/v4";
import { Button, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
//for star marking
import StarOutlineOutlinedIcon from "@material-ui/icons/StarOutlineOutlined";
import StarIcon from "@material-ui/icons/Star";
class MessageBox extends Component {
  state = {
    uploadTask: null,
    uploadState: "",
    showModal: false,
    messages: [],
    message: "",
    onMessageRef: firebase.database().ref("messages"),
    onPrivateMessagesRef: firebase.database().ref("privateMessages"),
    onStorageRef: firebase.storage(),
    userRef: firebase.database().ref("users"),
    file: null,
    fileData: null,
    isStarred: false,
  };
  getMessageRef = () => {
    return this.props.isPrivate
      ? this.state.onPrivateMessagesRef
      : this.state.onMessageRef;
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
    const ref = this.getMessageRef();
    ref
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

  componentDidMount() {
    if (this.props.currentUser && this.props.currentChannel) {
      this.addUserStars(
        this.props.currentChannel.id,
        this.props.currentUser.uid
      );
      alert(`handler`);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentChannel !== this.props.currentChannel) {
      this.addUserStars(
        this.props.currentChannel.id,
        this.props.currentUser.uid
      );
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.currentChannel !== nextProps.currentChannel ||
      this.state !== nextState
    );
  }
  addUserStars = (channelId, userId) => {
    this.state.userRef
      .child(userId)
      .child("starred")
      .once("value")
      .then((data) => {
        if (data.val() !== null) {
          const channelIds = Object.keys(data.val());
          const prevStarred = channelIds.includes(channelId);
          console.log(prevStarred);
          console.log(channelIds);
          this.setState({ isStarred: prevStarred });
        }
      });
  };

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
  getPath = () => {
    if (this.props.isPrivate) {
      return `chat/private-${this.props.currentChannel.id}`;
    } else {
      return `chat/pulic`;
    }
  };
  uploadImage = (e) => {
    e.preventDefault();
    console.log("uploading");
    // this.setState({uploadTask:this.state.onStorageRef(filePath).put(this.state.file)
    // const ref = this.getMessageRef();
    const filePath = `${this.getPath()}/${uuidv4()}.jpg`;
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

            this.getMessageRef()
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
  starClicked = () => {
    this.setState(
      (prevState) => ({
        ...prevState,
        isStarred: !prevState.isStarred,
      }),
      () => {
        this.starChannel();
      }
    );
  };
  starChannel = () => {
    if (this.state.isStarred) {
      this.state.userRef.child(`${this.props.currentUser.uid}/starred`).update({
        [this.props.currentChannel.id]: {
          name: this.props.currentChannel.name,
          details: this.props.currentChannel.details,
          createdBy: {
            name: this.props.currentChannel.createdBy.username,
            avatar: this.props.currentChannel.createdBy.avatar,
          },
        },
      });
    } else {
      this.state.userRef
        .child(`${this.props.currentUser.uid}/starred`)
        .child(this.props.currentChannel.id)
        .remove((err) => {
          console.log(err);
        });
    }
  };
  render() {
    return (
      <div className={classes.MessageBox}>
        <div className={classes.Header}>
          {this.props.currentChannel ? (
            <h2 style={{ verticalAlign: "middle", marginRight: "auto" }}>
              {this.props.currentChannel.name}
              {this.state.isStarred ? (
                <StarIcon
                  onClick={this.starClicked}
                  style={{ verticalAlign: "middle" }}
                />
              ) : (
                <StarOutlineOutlinedIcon
                  style={{ verticalAlign: "middle" }}
                  onClick={this.starClicked}
                />
              )}
            </h2>
          ) : (
            <h2>Loading...</h2>
          )}

          <TextField
            // onChange={}
            fullWidth
            style={{ width: "200px", marginLeft: "auto" }}
            type="text"
            label="Search"
            name="message"
            variant="outlined"
            size="small"
            // onChange={this.changeHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={classes.Messages}>
          <Message
            messageRef={this.state.onMessageRef}
            // currentChannel={this.props.currentChannel}
          />
        </div>
        <div>
          <TextField
            fullWidth
            style={{ width: "500px", margin: "10px" }}
            type="text"
            label="Type Message"
            name="message"
            variant="outlined"
            size="small"
            onChange={this.changeHandler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <SendIcon />
                </InputAdornment>
              ),
            }}
          />
          <div>
            <Button
              onClick={this.sendMessage}
              variant="contained"
              color="secondary"
            >
              Send
            </Button>
            <Button
              onClick={this.uploadMessage}
              variant="contained"
              color="secondary"
            >
              Upload
            </Button>
          </div>
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
    isPrivate: state.channel.isPrivate,
    isStarred: state.channel.isStarred,
  };
};
export default connect(mapStateToProps, { setChannel, starChannel })(
  MessageBox
);
