import React, { Component } from "react";
import "./AboutUs.css";

export class AboutUs extends Component {
  render() {
    return (
      <div className="aboutUs">
        <div className="menu">
          <div onClick={this.props.apparelClicked} className="menuItem active">
            APPAREL
          </div>
          <div className="menuItem">FILM</div>
          <div className="menuItem">DESIGN</div>
          <div className="menuItem">MUSIC</div>
        </div>
        <div className="about">
          Varana .....
          <br />
          <br /> More importantly, we're a fun circus and our work is serious
          fun
        </div>
      </div>
    );
  }
}

export default AboutUs;
