import React, { Component } from "react";
import Channel from "./Channel/Channel";
import Modal from "./Modal/Modal";
class Channels extends Component {
  state = {
    showModal: false,
    channelName: "",
    channelDescription: "",
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
  channelAddedHandler = (e) => {
    e.preventDefault();
    if (this.isFormValid(this.state)) {
      console.log(`chanel added`);
      this.setState({ showModal: false });
    }
  };
  isFormValid({ channelName, channelDescription }) {
    return channelName && channelDescription;
  }
  inputChangeHanlder = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };
  render() {
    return (
      <div>
        <div>
          Channels() <button onClick={this.addChannel}>+</button>
        </div>
        <Channel />
        {this.state.showModal ? (
          <Modal
            changed={this.inputChangeHanlder}
            modalClose={this.modalClosedHandler}
            channelAdded={this.channelAddedHandler}
          />
        ) : null}
      </div>
    );
  }
}

export default Channels;
