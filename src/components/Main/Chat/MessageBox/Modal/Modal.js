import React, { Component } from "react";
import classes from "./Modal.css";
const messageModal = (props) => {
  return (
    <div className={classes.Modal}>
      <form className={classes.Form} onSubmit={props.uploadImage}>
        <input
          // use e.target.name onchange property
          onChange={props.changeHandler}
          type="file"
          placeholder="Upload Image"
          className={classes.Input}
          name="uploadFile"
          style={{ backgroundColor: "red" }}
        />

        <button onClick={props.uploadImage}>Upload</button>
        {/* this.props.modalClose to pass this to parent component */}
        <button onClick={props.closeModal}>Cancel</button>
      </form>
    </div>
  );
};

export default messageModal;
