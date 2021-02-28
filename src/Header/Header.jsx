import React, { Component } from "react";
import "./Header.css";

export class Header extends Component {
  render() {
    return (
      <div className="header" style={{ color: this.props.color }}>
        {/* <div className="leftIcon">
          <span onClick={this.props.sideBarIconClicked} className="headerIcon">
            <i className="fa fa-bars" />
          </span>
    </div>*/}
        <div className="rightIcons">
          <span onClick={this.props.cartIconClicked} className="headerIcon">
            <i className="fa fa-shopping-cart" />
            <span className="w3-small"> {this.props.noOfItems}</span>
          </span>
          <span onClick={this.props.userIconClicked} className="headerIcon">
            <i className="fa fa-user-circle-o" />
          </span>
        </div>
      </div>
    );
  }
}

export default Header;
