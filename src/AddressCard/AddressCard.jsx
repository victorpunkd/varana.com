import React, { Component } from "react";
import "./AddressCard.css";

export class AddressCard extends Component {
  render() {
    return (
      <div className="addressCard w3-border w3-border-gray">
        <div>
          <div style={{ fontWeight: 900, width: "100%" }}>
            {this.props.type}
          </div>
          <div>
            {this.props.address} {this.props.locality} {this.props.city}{" "}
            {this.props.state} {this.props.pincode} {this.props.landmark}
          </div>
          <div>Phone No - {this.props.receiversPhoneNo}</div>
        </div>
        <div className="w3-row" style={{ width: "100%", marginTop: "5%" }}>
          <div className="w3-col s6" style={{ paddingRight: "2%" }}>
            <button
              onClick={() => this.props.editAddressClicked(this.props.type)}
              className="w3-btn w3-padding-small w3-small  w3-white w3-border-black w3-border"
              style={{ width: "100%" }}
            >
              Edit
            </button>
          </div>
          <div className="w3-col s6" style={{ paddingLeft: "2%" }}>
            <button
              onClick={() => this.props.removeAddressClicked(this.props.type)}
              className="w3-btn w3-padding-small w3-small w3-white w3-border-black w3-border w3-text-red"
              style={{ width: "100%" }}
            >
              Remove
            </button>
          </div>
          <button
            disabled={this.props.isDeafultAddress === "1" ? true : false}
            className="w3-btn button w3-black"
            style={{ marginTop: "5%" }}
            onClick={() =>
              this.props.makeDeafultAddressClicked(this.props.type)
            }
          >
            Deliver Here
          </button>
        </div>
      </div>
    );
  }
}

export default AddressCard;
