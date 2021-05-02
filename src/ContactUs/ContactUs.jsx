import React, { Component } from "react";
import "./ContactUs.css";

export class ContactUs extends Component {
  render() {
    return (
      <div className="contactUs secondaryTextFont">
        <div style={{ marginTop: 20 }}>
          <span>
            <i class="fa fa-envelope"></i>
          </span>
          <span style={{ marginLeft: 10, textAlign: "left" }}>
            +91 97392 44794
          </span>
        </div>
        <div style={{ marginTop: 20 }}>
          <span>
            <i class="fa fa-envelope"></i>
          </span>
          <span style={{ marginLeft: 10, textAlign: "left" }}>
            stylewithvarana@gmail.com
          </span>
        </div>
        <div style={{ marginTop: 20 }}>
          <span>
            <i class="fa fa-map-marker"></i>
          </span>
          <span style={{ marginLeft: 10, textAlign: "left" }}>
            Gurgaon, India
          </span>
        </div>
      </div>
    );
  }
}

export default ContactUs;
