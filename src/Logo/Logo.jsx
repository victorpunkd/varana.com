import React, { Component } from "react";
import "./Logo.css";

export class Logo extends Component {
  render() {
    return (
      <div>
        <img
          src="https://varana-files.s3.us-east-2.amazonaws.com/static_images/varana_logo_red.png"
          className="logo"
          alt="Varana Logo"
          onClick={this.props.logoClicked}
        />
      </div>
    );
  }
}

export default Logo;
