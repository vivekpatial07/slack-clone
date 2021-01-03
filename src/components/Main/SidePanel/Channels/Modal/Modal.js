import React from "react";
import classes from "./Modal.css";
const Modal = (props) => {
  return (
    <div className={classes.Modal}>
      <form className={classes.Form} onSubmit={props.channelAdded}>
        <input
          type="text"
          placeholder="Channel Name"
          className={classes.Input}
          onChange={props.changed}
          name='channelName'
        />
        <input
          type="text"
          placeholder="Description"
          className={classes.Input}
          onChange={props.changed}
          name='channelDescription'
        />
        <button onClick={props.channelAdded}>Add</button>
        {/* props.modalClose to pass this to parent component */}
        <button onClick={props.modalClose}>Cancel</button>
      </form>
    </div>
  );
};

export default Modal;
