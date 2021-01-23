import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "../../../../firebase";
import classes from "./Starred.css";
import StarsIcon from "@material-ui/icons/Stars";
class Starred extends Component {
  state = {
    userRef: firebase.database().ref("users"),
    starredChannels: [],
  };
  componentDidMount() {
    if (this.props.user) {
      this.addListener();
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.user !== this.props.user) {
  //     this.addListener(this.props.user);
  //     alert(`did updtae`);
  //   }
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     this.props.user !== nextProps.user ||
  //     this.state.starredChannels !== nextState.starredChannels
  //   );
  // }

  addListener = () => {
    // console.log(`clicked`);
    this.state.userRef
      .child(this.props.user.uid)
      .child("starred")
      .on("child_added", (snap) => {
        const channels = { id: snap.key, ...snap.val() };
        this.setState({
          starredChannels: [...this.state.starredChannels, channels],
        });
        // const channels = [...this.state.starredChannels];
        // channels.push(snap.val());
        // this.setState({ starredChannels: channels });
        // console.log(this.state.starredChannels);
      });
    this.state.userRef
      .child(this.props.user.uid)
      .child("starred")
      .on("child_removed", (snap) => {
        const unstarredChannel = { id: snap.key, ...snap.val() };
        const filteredChannels = this.state.starredChannels.filter(
          (channel) => {
            return channel.id !== unstarredChannel.id;
          }
        );
        this.setState({ starredChannels: filteredChannels });
        // console.log(channels,unstarredChannel);
        // console.log(this.state.starredChannels);
      });
  };
  componentWillUnmount() {
    this.state.userRef.off();
  }
  render() {
    return (
      <div style={{ margin: "27px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <StarsIcon />
          Starred{"      "}({this.state.starredChannels.length})
        </div>
        <div>
          {this.state.starredChannels.map((channel) => {
            return (
              <div
                key={channel.id + Math.random() * 7}
                style={{ listStyle: "none" }}
                className={classes.Channel}
              >
                #{"              "} {channel.name}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(Starred);
