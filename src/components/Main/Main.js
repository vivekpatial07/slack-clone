import React from "react";
import Chat from "./Chat/Chat";
import SidePanel from "./SidePanel/SidePanel";
import classes from "./Main.css";
function Main() {
  return (
    <div container className={classes.Main}>
      <SidePanel />
      <Chat />
    </div>
  );
}

export default Main;
