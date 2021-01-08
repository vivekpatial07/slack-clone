import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./SidePanel.css";
import firebase from "../../../firebase";
import Channels from "./Channels/Channels";
import Button from "@material-ui/core/Button";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

class SidePanel extends Component {
  signOutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log(`Sign out successful`);
      })
      .catch((err) => console.log(err));
  };
  render() {
    console.log(this.props.avatar);
    return (
      <div className={classes.SidePanel}>
        <h2>
          <CodeRoundedIcon />
          {/* <Icon>CodeIcon</Icon> */}
          <Typography>Slack-Clone</Typography>
        </h2>
        <Box
          p={7}
          mx="auto"
          // display="block"
          display="flex"
          justifyContent="center"
        >
          <Avatar alt="avatar" src={this.props.avatar} />
          <Typography>{this.props.username}</Typography>
        </Box>

        <Button
          variant="contained"
          onClick={this.signOutHandler}
          color="primary"
        >
          Sign Out!
        </Button>
        <div>
          {/* change the typography from here to channels components */}
          <Box p={7}>
            <Typography>
              <Channels />
            </Typography>
          </Box>
        </div>
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
