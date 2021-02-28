import React, { Component } from "react";
import "./SpecialMessage.css";

export class SpecialMessage extends Component {
  render() {
    return (
      <div
        className="specialMessageContainer"
        style={{ color: this.props.color }}
      ></div>
    );
  }
}

export default SpecialMessage;
