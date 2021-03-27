import React, { Component } from "react";
import "./Logo.css";

export class Logo extends Component {
  render() {
    return (
      <div>
        <img
          src="https://s3.ap-south-1.amazonaws.com/varana.com-files/static-images/logo/varana-logo-red.png"
          className="logo"
          alt="Varana Logo"
          onClick={this.props.logoClicked}
        />
      </div>
    );
  }
}

export default Logo;
