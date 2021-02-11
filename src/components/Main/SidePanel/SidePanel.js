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
import AvatarEditor from "react-avatar-editor";
import { setUser } from "../../../store/actions";
class SidePanel extends Component {
  state = {
    showModal: false,
    previewImage: null,
    croppedImage: "",
    blob: "",
    storageRef: firebase.storage().ref(),
    userRef: firebase.auth().currentUser,
    usersRef: firebase.database().ref("users"),
    metadata: {
      contentType: "image/jpg",
    },
    uploadedImage: "",
  };
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
  uploadAvatar = () => {
    //cropping
    if (this.avatarEditor) {
      console.log(`uplaoing`);
      this.avatarEditor.getImageScaledToCanvas().toBlob((blob) => {
        let imageUrl = URL.createObjectURL(blob);
        this.setState(
          {
            croppedImage: imageUrl,
            blob,
          },
          () => {
            console.log(this.state);
            this.state.storageRef
              .child(`avatars/users-${this.state.userRef.uid}`)
              .put(this.state.blob, this.state.metadata)
              .then((snap) => {
                snap.ref.getDownloadURL().then((downloadURL) => {
                  this.setState({ uploadedImage: downloadURL }, () => {
                    console.log(this.state);
                    this.changeAvatar();
                  });
                });
              });
          }
        );
      });
    }
  };
  changeAvatar = () => {
    console.log(`change avatar`);
    this.state.userRef
      .updateProfile({
        photoURL: this.state.uploadedImage,
      })
      .then(() => {
        console.log("updated");
        this.setState({ showModal: false }, () => {
          this.props.setUser(this.props.currentUser);
        });
      })
      .catch((err) => console.log(err));

    this.state.usersRef
      .child(this.state.userRef.uid)
      .update({ avatar: this.state.uploadedImage })
      .then(() => {
        console.log(`user avatar updated`);
        this.props.setUser(this.props.currentUser);

        //not updating idk why
        // this.setState({ avatar: this.props.avatar });
        // this.forceUpdate();
      })
      .catch((err) => console.log(err));
  };

  changeHandler = (e) => {
    const file = e.target.files[0];
    // this.setState({ file: file });
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        this.setState({ previewImage: reader.result });
      });
    }
  };
  render() {
    return (
      <div>
        {this.props.showPanel ? (
          <div className={classes.SidePanel}>
            <h2>
              {this.state.previewImage && this.state.prevImage}
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
              <div>
                <AvatarModal
                  closeModal={() => {
                    this.setState({ showModal: false });
                  }}
                  uploadAvatar={this.uploadAvatar}
                  changeHandler={this.changeHandler}
                  // prevImage={this.state.previewImage}
                  // ref={(node) => (this.avatarEditor = node)}
                />
                {this.state.previewImage && (
                  <div
                    style={{
                      zIndex: "700",
                      position: "fixed",
                      left: "50%",
                      top: "50%",
                      transform: " translate(-50%, -50%)",
                    }}
                  >
                    <AvatarEditor
                      image={this.state.previewImage}
                      width={140}
                      height={140}
                      border={27}
                      borderRadius={70}
                      scale={1.4}
                      ref={(node) => (this.avatarEditor = node)}
                    />
                  </div>
                )}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.user.currentUser.displayName,
    avatar: state.user.currentUser.photoURL,
    currentUser: state.user.currentUser,
    showPanel: state.side.showPanel,
  };
};
export default connect(mapStateToProps, { setUser })(SidePanel);
