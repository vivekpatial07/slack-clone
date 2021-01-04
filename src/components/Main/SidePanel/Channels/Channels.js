import React, { Component } from "react";
//  import Channel from "./Channel/Channel";
import Modal from "./Modal/Modal";
import firebase from "../../../../firebase";
import { connect } from "react-redux";
import { setChannel } from "../../../../store/actions";
class Channels extends Component {
  state = {
    //soon will change this state management to redux state mgmnt.
    showModal: false,
    channelName: "",
    channelDescription: "",
    onChannelRef: firebase.database().ref("channels"),
    channels: [],
  };

  //for showing number of channels

  componentDidMount() {
    this.state.onChannelRef.on(
      "child_added", //Used child_added not value because it will give only the child and not the whole value so its apt for munging lists
      (snapshot) => {
        //firebase returns an argument
        const updatedChannel = [...this.state.channels];
        updatedChannel.push(snapshot.val());
        this.setState({ channels: updatedChannel });
        // console.log(this.state.channels);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  componentWillUnmount() {
    //removing all the listeners
    this.state.onChannelRef.off();
  }

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
          .update({
            id: channelId,
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
  //for selecting and setting current channel on global state
  channelClicked = (channel) => {
    console.log(channel);
    //setting active class remaining
    this.props.setChannel(channel);
  };
  render() {
    const allChannels = this.state.channels.map((channel) => {
      return (
        <div key={channel.id} onClick={() => this.channelClicked(channel)}>
          #{channel.name}
        </div>
      );
    });

    return (
      <div>
        <div>
          Channels({this.state.channels.length}){" "}
          <button onClick={this.addChannel}>+</button>
        </div>
        {/* Will use this later now just fixing by using {allChannels} */}
        {/* not using this because there is some problem with datafethcing and passing async data down the components */}
        {/* <Channel channels={this.state.channels} /> */}
        {allChannels}
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
    currentChannel: state.channel.currentChannel,
  };
};
export default connect(mapStateToProps, { setChannel })(Channels);
