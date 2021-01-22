import React from "react";
import classes from "./avatarModal.css";
import Button from "@material-ui/core/Button";
const AvatarModal = (props) => {
  return (
    <div className={classes.Modal}>
      <h1>Change Avatar</h1>
      <form className={classes.Form} onSubmit={props.uploadImage}>
        <input
          // use e.target.name onchange property
          onChange={props.changeHandler}
          type="file"
          placeholder="Upload Image"
          className={classes.Input}
          name="uploadFile"
        />

        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={props.uploadAvatar}
        >
          Upload Avatar
        </Button>
        {/* this.props.modalClose to pass this to parent component */}
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={props.closeModal}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default AvatarModal;
