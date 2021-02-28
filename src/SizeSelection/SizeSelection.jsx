import React, { Component } from "react";
import "./SizeSelection.css";

export class SizeSelectio extends Component {
  render() {
    return (
      <div className="sizeSelectionMainDiv">
        <div className="containerDiv">
          <div className="w3-xlarge">
            Select which size to be{" "}
            {this.props.isMinusOperation ? "removed" : "added"}
          </div>
          {this.props.sizeToShow.map(data => (
            <button
              style={{ marginTop: "2%" }}
              className="w3-btn button w3-white w3-border w3-border-black"
              onClick={() =>
                this.props.sizeButtonClicked(
                  data,
                  this.props.isMinusOperation,
                  this.props.productId
                )
              }
            >
              {data}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default SizeSelectio;
