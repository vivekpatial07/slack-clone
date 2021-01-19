import { Button } from "@material-ui/core";
import React from "react";
import classes from "./Modal.css";
const Modal = (props) => {
  return (
    <div className={classes.Modal}>
      <h1>Add Channel</h1>
      <form className={classes.Form} onSubmit={props.channelAdded}>
        <input
          type="text"
          placeholder="Channel Name"
          className={classes.Input}
          onChange={props.changed}
          name="channelName"
        />
        <input
          type="text"
          placeholder="Description"
          className={classes.Input}
          onChange={props.changed}
          name="channelDescription"
        />
        <Button
          onClick={props.channelAdded}
          variant="contained"
          color="secondary"
          size="small"
        >
          Add
        </Button>
        {/* props.modalClose to pass this to parent component */}
        <Button
          onClick={props.modalClose}
          variant="contained"
          color="secondary"
          size="small"
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default Modal;
