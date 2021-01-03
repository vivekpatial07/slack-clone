import React, { Component } from "react";
import Channel from "./Channel/Channel";
import Modal from "./Modal/Modal";
class Channels extends Component {
  state = {
    showModal: false,
  };
  //For opening model
  addChannel = () => {
    this.setState({ showModal: true });
  };
  //For closing model when clicked
  modalClosedHandler = (e) => {
    e.preventDefault();
    // console.log(`modal closed`);
    this.setState({ showModal: false });
  };
  render() {
    return (
      <div>
        <div>
          Channels() <button onClick={this.addChannel}>+</button>
        </div>
        <Channel />
        {this.state.showModal ? (
          <Modal modalClose={this.modalClosedHandler} />
        ) : null}
      </div>
    );
  }
}

export default Channels;
