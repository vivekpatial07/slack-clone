import React from "react";
import classes from "./Modal.css";
const Modal = (props) => {
  return (
    <div className={classes.Modal} onClick={props.modalClose}>
      <form className={classes.Form}>
        <input
          type="text"
          placeholder="Channel Name"
          className={classes.Input}
        />
        <input
          type="text"
          placeholder="Description"
          className={classes.Input}
        />
        <button>Add</button>
        {/* props.modalClose to pass this to parent component */}
        <button onClick={props.modalClose}>Cancel</button>
      </form>
    </div>
  );
};

export default Modal;
