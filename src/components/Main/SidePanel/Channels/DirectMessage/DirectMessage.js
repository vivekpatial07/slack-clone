import React, { Component } from "react";
import MessageIcon from "@material-ui/icons/Message";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import firebase from "firebase";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { setChannel } from "../../../../../store/actions";
import { setPrivateChannel } from "../../../../../store/actions";

class DirectMessage extends Component {
  state = {
    users: [],
    user: this.props.currentUser,
    usersRef: firebase.database().ref("users"),
    connectedRef: firebase.database().ref(".info/connected"),
    presenceRef: firebase.database().ref("presence"),
  };
  componentDidMount() {
    if (this.state.user) {
      this.addListener(this.state.user.uid);
    }
  }

  addListener = (currentUserId) => {
    let loadedUsers = [];
    this.state.usersRef.on("child_added", (snapshot) => {
      //   console.log(snapshot.val());
      if (currentUserId !== snapshot.key) {
        let user = snapshot.val();
        user["uid"] = snapshot.key;
        user["status"] = "offline";
        loadedUsers.push(user);
        this.setState({ users: loadedUsers });
      }
    });
    this.state.connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        const ref = this.state.presenceRef.child(currentUserId);
        ref.set(true);
        ref.onDisconnect().remove((err) => {
          if (err !== null) {
            console.log(err);
          }
        });
      }
    });
    this.state.presenceRef.on("child_added", (snap) => {
      if (currentUserId !== snap.key) {
        this.addStatusToUser(snap.key);
      }
    });
    this.state.presenceRef.on("child_removed", (snap) => {
      if (currentUserId !== snap.key) {
        this.addStatusToUser(snap.key, false);
      }
    });
  };
  addStatusToUser = (userId, connected = true) => {
    const updatedUsers = this.state.users.reduce((acc, user) => {
      if (user.uid === userId) {
        user["status"] = `${connected ? "online" : "offline"}`;
      }
      return acc.concat(user);
    }, []);
    this.setState({ users: updatedUsers });
  };
  isUserOnline = (user) => user.status === "online";
  changeChannel = (userClicked) => {
    let channelId = this.getChannelId(userClicked.uid);
    const channelData = {
      id: channelId,
      name: userClicked.name,
    };
    this.props.setChannel(channelData);
    this.props.setPrivateChannel(true);
  };
  getChannelId = (id) => {
    let currentUId = this.props.currentUser.uid;
    return currentUId > id ? `${id}av${currentUId}` : `${currentUId}va${id}`;
  };
  render() {
    return (
      <Box alignItems="center">
        <MessageIcon />
        <br />
        DirectMessage{"  "}({this.state.users.length})
        <br />
        <ul style={{ listStyle: "none" }}>
          {this.state.users.map((u) => {
            return (
              <li
                key={u.uid}
                onClick={() => this.changeChannel(u)}
                style={{ color: "white", fontStyle: "italic" }}
              >
                @{u.name}
                <FiberManualRecordIcon
                  fontSize="small"
                  color={this.isUserOnline(u) ? "primary" : "secondary"}
                />
              </li>
            );
          })}
        </ul>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    isPrivate: state.channel.isPrivate,
  };
};
export default connect(mapStateToProps, { setChannel, setPrivateChannel })(
  DirectMessage
);
