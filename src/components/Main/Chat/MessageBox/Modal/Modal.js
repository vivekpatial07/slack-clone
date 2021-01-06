import React from "react";
import classes from "./Modal.css";
const Modal = (props) => {
  return (
    <div className={classes.Modal}>
      <form className={classes.Form} onSubmit={props.uploadImage}>
        <input
          // use e.target.name onchange property

          type="file"
          placeholder="Upload Image"
          className={classes.Input}
          name="uploadFile"
          style={{ backgroundColor: "red" }}
        />

        <button onClick={props.uploadImage}>Upload</button>
        {/* props.modalClose to pass this to parent component */}
        <button onClick={props.closeModal}>Cancel</button>
      </form>
    </div>
  );
};

export default Modal;
