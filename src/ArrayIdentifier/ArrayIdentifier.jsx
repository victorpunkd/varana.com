import React, { Component } from "react";
import "./ArrayIdentifier.css";

export class ArrayIdentifier extends Component {
  render() {
    return (
      <>
        <i
          className={`fa fa-circle arrayIdentifier ${
            this.props.componentKey === this.props.currentPictureIndex
              ? "activeIdentifier"
              : "nonActiveIdentifier"
          }`}
        ></i>
      </>
    );
  }
}

export default ArrayIdentifier;
