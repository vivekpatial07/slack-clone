import React, { Component } from "react";
class Channel extends Component {
  state = {
    channelReference: this.props.channelRef,
  };
  //component will unmount for removing callbacks
  render() {
    // const channels = [];

    return (
      <div>
        <div>#Channel</div>
      </div>
    );
  }
}
export default Channel;
