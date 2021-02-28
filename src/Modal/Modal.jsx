import React, { Component } from "react";
import "./Modal.css";

export class Modal extends Component {
  render() {
    return (
      <div className="mainDiv w3-animate-top">
        <div className="w3-black" style={{ width: "100%" }}>
          <div className="w3-container" style={{ padding: "1.5% 1.5%" }}>
            <div>{this.props.message}</div>
          </div>
          <button
            onClick={() => {
              this.props.closeModalClicked();
            }}
            style={{ backgroundColor: "#B4252D" }}
            className="w3-btn button"
          >
            Ok
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;
