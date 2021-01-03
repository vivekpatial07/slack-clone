import React, { Component } from "react";
import Channel from "./Channel/Channel";
import Modal from "./Modal/Modal";
import firebase from "../../../../firebase";
import { connect } from "react-redux";
class Channels extends Component {
  state = {
    //soon will change this state management to redux state mgmnt.
    showModal: false,
    channelName: "",
    channelDescription: "",
    onChannelRef: firebase.database().ref("channels"),
    channelLength: 0,
    // channels: [],
  };

  //for showing number of channels
  // componentDidMount() {
  //   this.state.onChannelRef.on(
  //     "value",
  //     (snapshot) => {
  //       const channelsObj = snapshot.val();
  //       const channels = Object.entries(channelsObj);
  //       console.log(channels);
  //       this.setState({ channelLength: channels.length, channels: channels });
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  // //For opening model
  addChannel = () => {
    this.setState({ showModal: true });
  };
  //For closing model when clicked
  modalClosedHandler = (e) => {
    e.preventDefault();
    // console.log(`modal closed`);
    this.setState({ showModal: false });
  };
  //Channel adder
  channelAddedHandler = (e) => {
    e.preventDefault();
    //For Adding Channel data to the database
    if (this.isFormValid(this.state)) {
      // Not sure whether its useful or not
      if (this.props.currentUser) {
        //inbuilt firebase property to push a unique id to onChannelRef
        const channelId = this.state.onChannelRef.push().key;
        //To save channel data to the database
        //(with a child as channelId and subchild as set object)
        this.state.onChannelRef
          .child(channelId)
          .set({
            name: this.state.channelName,
            details: this.state.channelDescription,
            createdBy: {
              username: this.props.currentUser.displayName,
              avatar: this.props.currentUser.photoURL,
            },
          })
          .then(() => {
            this.setState({ showModal: false });
          });
      }
    }
  };
  //Validation checker
  isFormValid({ channelName, channelDescription }) {
    return channelName && channelDescription;
  }
  //controlled input
  inputChangeHanlder = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };
  render() {
    return (
      <div>
        <div>
          Channels({this.state.channelLength}){" "}
          <button onClick={this.addChannel}>+</button>
        </div>
        <Channel channelRef={this.state.onChannelRef} />
        {this.state.showModal ? (
          <Modal
            changed={this.inputChangeHanlder}
            modalClose={this.modalClosedHandler}
            channelAdded={this.channelAddedHandler}
          />
        ) : null}
        {/* {this.state.channels} */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(Channels);
