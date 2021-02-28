import React, { Component } from "react";
import "./AccountOptions.css";

export class AccountOptions extends Component {
  render() {
    return (
      <div className="accountOptions w3-card">
        <div onClick={this.props.myAccountClicked} className="options">
          My Account
        </div>
        <div onClick={this.props.manageAddressClicked} className="options">
          Manage Address
        </div>
        <div onClick={this.props.manageOrdersClicked} className="options">
          Manage Orders
        </div>
        <div onClick={this.props.favouritesClicked} className="options">
          My Favourites
        </div>
        <div
          onClick={this.props.logoutClicked}
          className="options"
          style={{ border: "none" }}
        >
          Logout
        </div>
      </div>
    );
  }
}

export default AccountOptions;
