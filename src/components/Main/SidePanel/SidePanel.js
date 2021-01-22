import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./SidePanel.css";
import firebase from "../../../firebase";
import Channels from "./Channels/Channels";
import Button from "@material-ui/core/Button";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import DirectMessage from "./Channels/DirectMessage/DirectMessage";
import Starred from "./Starred/Starred";
import AvatarModal from "./avatarModal";

class SidePanel extends Component {
  state = { showModal: false, file: null };
  signOutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log(`Sign out successful`);
      })
      .catch((err) => console.log(err));
  };
  showModal = () => {
    console.log(`clicked`);
    this.setState({ showModal: true });
  };
  uploadAvatar = () => {};
  changeHandler = (e) => {
    const file = e.target.files[0];
    this.setState({ file: file }, () => {
      console.log(this.state.file);
    });
  };
  render() {
    return (
      <div className={classes.SidePanel}>
        <h2>
          <CodeRoundedIcon />
          <Typography>Slack-Clone</Typography>
        </h2>
        <div
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {/* need to restyle  */}
          <img
            style={{
              margin: "auto",
              height: "27px",
              width: "27px",
              borderRadius: "27px",
            }}
            alt="avatar"
            src={this.props.avatar}
          />
          <Typography>{this.props.username}</Typography>
        </div>
        <Button
          size="small"
          variant="contained"
          onClick={this.showModal}
          color="secondary"
        >
          Change Avatar
        </Button>

        <Button
          size="small"
          variant="contained"
          onClick={this.signOutHandler}
          color="secondary"
        >
          Sign Out!
        </Button>
        <div>
          {/* change the typography from here to channels components */}
          <Box>
            <Starred />
          </Box>
          <Box>
            <Channels />
          </Box>
          <Box>
            <DirectMessage />
          </Box>
        </div>
        {this.state.showModal ? (
          <AvatarModal
            closeModal={() => {
              this.setState({ showModal: false });
            }}
            uploadAvatar={this.uploadAvatar}
            changeHandler={this.changeHandler}
          />
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.user.currentUser.displayName,
    avatar: state.user.currentUser.photoURL,
  };
};
export default connect(mapStateToProps)(SidePanel);
