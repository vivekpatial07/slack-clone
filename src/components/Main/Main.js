import React from "react";
import Chat from "./Chat/Chat";
import SidePanel from "./SidePanel/SidePanel";
import classes from "./Main.css";
import MetaPanel from "./MetaPanel/MetaPanel";
function Main() {
  return (
    <div className={classes.Main}>
      <SidePanel />
      <Chat />
    </div>
  );
}

export default Main;
