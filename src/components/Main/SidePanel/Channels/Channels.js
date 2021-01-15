import React, { Component } from "react";
//might delete later
//  import Channel from "./Channel/Channel";

import Modal from "./Modal/Modal";
import firebase from "../../../../firebase";
import { connect } from "react-redux";
import { setPrivateChannel } from "../../../../store/actions";
import { setChannel } from "../../../../store/actions";
class Channels extends Component {
  state = {
    //soon will change this state management to redux state mgmnt.
    showModal: false,
    channelName: "",
    channelDescription: "",
    onChannelRef: firebase.database().ref("channels"),
    channels: [],
    firstLoad: true,
    channel: null,
    onMessageRef: firebase.database().ref("messages"),
    notifications: [],
  };

  //for showing number of channels

  componentDidMount() {
    this.loadChannels();
  }

  componentWillUnmount() {
    //removing all the listeners
    this.state.onChannelRef.off();
  }
  setFirstChannel = () => {
    let channel = this.state.channels[0];
    if (this.state.channels.length > 0 && this.state.firstLoad) {
      this.props.setChannel(channel);
      this.setState({ channel: channel });
    }
    this.setState({ firstLoad: false });
  };
  loadChannels = () => {
    this.state.onChannelRef.on(
      "child_added", //Used child_added not value because it will give only the child and not the whole value so its apt for munging lists
      (snapshot) => {
        //firebase returns an argument
        const updatedChannel = [...this.state.channels];
        updatedChannel.push(snapshot.val());
        this.setState({ channels: updatedChannel }, () =>
          this.setFirstChannel()
        );
        this.addNotification(snapshot.key);
        // console.log(this.state.channels);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  addNotification = (channelId) => {
    this.state.onMessageRef.child(channelId).on("value", (snap) => {
      if (this.state.channel) {
        this.handleNotifications(
          channelId,
          this.state.channel.id,
          this.state.notifications,
          snap
        );
      }
    });
  };
  handleNotifications = (channelId, currentChannelId, notifications, snap) => {
    let lastTotal = 0;
    let index = notifications.findIndex((notif) => notif.id === channelId);

    if (index !== -1) {
      if (channelId !== currentChannelId) {
        lastTotal = notifications[index].total;
        if (snap.numChildren() - lastTotal > 0) {
          notifications[index].count = snap.numChildren() - lastTotal;
        }
      }
      notifications[index].lastKnownTotal = snap.numChildren();
    } else {
      notifications.push({
        id: channelId,
        total: snap.numChildren(),
        lastKnownTotal: snap.numChildren(),
        count: 0,
      });
    }
    this.setState({ notifications });
  };
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
    // console.log(channel);
    //setting active class remaining
    this.clearNotification();
    this.props.setChannel(channel);
    this.props.setPrivateChannel(false);
    this.setState({ channel });
  };
  clearNotification = () => {
    let index = this.state.notifications.findIndex(
      (notif) => notif.id === this.state.channel.id
    );
    if (index !== -1) {
      let updatedNotification = [...this.state.notifications];
      updatedNotification[index].total = this.state.notifications[
        index
      ].lastKnownTotal;
      updatedNotification[index].count = 0;
      this.setState({ notifications: updatedNotification });
    }
  };
  getNotificationCount = (channel) => {
    let count = 0;
    this.state.notifications.forEach((notif) => {
      if (notif.id === channel.id) {
        count = notif.count;
      }
    });
    if (count > 0) return count;
  };
  render() {
    const allChannels = this.state.channels.map((channel) => {
      return (
        <div key={channel.id} onClick={() => this.channelClicked(channel)}>
          #{channel.name}
          {this.getNotificationCount(channel) && (
            <div
              style={{
                height: "50px",
                borderRadius: "27px",
                backgroundColor: "red",
              }}
            >
              {this.getNotificationCount(channel)}
            </div>
          )}
          {this.getNotificationCount(channel) && (
            <p>{this.getNotificationCount(channel)}</p>
          )}
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
    isPrivate: state.channel.isPrivate,
  };
};
export default connect(mapStateToProps, { setChannel, setPrivateChannel })(
  Channels
);
