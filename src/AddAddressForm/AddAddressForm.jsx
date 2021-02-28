import React, { Component } from "react";
import "./AddAddressForm.css";
import TextBoxContainer from "../TextBoxContainer/TextBoxContainer";
import { getApiEndpoint } from "../apiEndpoint";

export class AddAddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address:
        this.props.fullAddress.length === undefined
          ? this.props.fullAddress.address
          : "",
      locality:
        this.props.fullAddress.length === undefined
          ? this.props.fullAddress.locality
          : "",
      city:
        this.props.fullAddress.length === undefined
          ? this.props.fullAddress.city
          : "",
      state:
        this.props.fullAddress.length === undefined
          ? this.props.fullAddress.state
          : "",
      pincode:
        this.props.fullAddress.length === undefined
          ? this.props.fullAddress.pincode
          : "",
      landmark:
        this.props.fullAddress.length === undefined
          ? this.props.fullAddress.landmark
          : "",
      type:
        this.props.fullAddress.length === undefined
          ? this.props.fullAddress.type
          : "",
      receiverphoneno:
        this.props.fullAddress.length === undefined
          ? this.props.fullAddress.receivers_phone_no
          : localStorage.getItem("loggedInUserPhoneNo")
    };
    this.pincodeRegex = /^\d{6}$/;
    this.phoneNoRegex = /^\d{10}$/;
    this.addressRegex = /^$|\s+/;
  }

  handleOnBlur = (name, text) => {
    this.setState({ [name]: text });
  };

  handleSaveAddressCick = () => {
    if (
      this.state.address &&
      this.state.locality &&
      this.state.city &&
      this.state.pincode &&
      this.state.landmark &&
      this.state.type &&
      this.state.receiverphoneno
    ) {
      if (this.props.fullAddress.length === undefined) this.updateAddress();
      else this.addAddress();
    }
  };

  updateAddress = () => {
    fetch(
      `${getApiEndpoint()}/api/updateAddress/${localStorage.getItem(
        "loggedInUserPhoneNo"
      )}/${this.state.address}/${this.state.locality}/${this.state.city}/${
        this.state.state
      }/${this.state.pincode}/${this.state.landmark}/${this.state.type}/${
        this.state.receiverphoneno
      }`
    )
      .then(res => res.json())
      .then(
        data => {
          if (data[0].code === 100) {
            alert("Address updated");
            this.props.addAddressSuccessfull();
          } else {
            alert("something went wrong");
          }
        },
        error => {
          alert("Something went wrong please try again later");
          this.setState({
            error
          });
        }
      );
  };

  addAddress = () => {
    fetch(
      `${getApiEndpoint()}/api/addAddress/${localStorage.getItem(
        "loggedInUserPhoneNo"
      )}/${this.state.address}/${this.state.locality}/${this.state.city}/${
        this.state.state
      }/${this.state.pincode}/${this.state.landmark}/${this.state.type}/${
        this.state.receiverphoneno
      }`
    )
      .then(res => res.json())
      .then(
        data => {
          if (data[0].code === 201) {
            alert(
              `${
                data[0].type ? "type " + this.state.type + " already exist" : ""
              }`
            );
          } else {
            alert("Address added");
            this.props.addAddressSuccessfull();
          }
        },
        error => {
          this.setState({
            error
          });
          alert("Something went wrong please try again later");
        }
      );
  };

  render() {
    return (
      <div className="addAddressForm">
        <div>
          <TextBoxContainer
            label="Address"
            name="address"
            value={
              this.props.fullAddress.length === undefined
                ? this.props.fullAddress.address
                : ""
            }
            onBlur={this.handleOnBlur}
            regex={this.addressRegex}
            type="text"
          />
          <TextBoxContainer
            label="Locality"
            name="locality"
            value={
              this.props.fullAddress.length === undefined
                ? this.props.fullAddress.locality
                : ""
            }
            onBlur={this.handleOnBlur}
            regex={""}
            type="text"
          />
          <div className="w3-row">
            <div className="w3-col s6" style={{ paddingRight: "3%" }}>
              <TextBoxContainer
                label="City"
                name="city"
                value={
                  this.props.fullAddress.length === undefined
                    ? this.props.fullAddress.city
                    : ""
                }
                onBlur={this.handleOnBlur}
                regex={""}
                type="text"
              />
            </div>
            <div className="w3-col s6" style={{ paddingRight: "3%" }}>
              <TextBoxContainer
                label="State"
                name="state"
                value={
                  this.props.fullAddress.length === undefined
                    ? this.props.fullAddress.state
                    : ""
                }
                onBlur={this.handleOnBlur}
                regex={""}
                type="text"
              />
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-col s6" style={{ paddingRight: "3%" }}>
              <TextBoxContainer
                label="Pincode"
                name="pincode"
                value={
                  this.props.fullAddress.length === undefined
                    ? this.props.fullAddress.pincode
                    : ""
                }
                onBlur={this.handleOnBlur}
                regex={this.pincodeRegex}
                type="text"
              />
            </div>
            <div className="w3-col s6" style={{ paddingRight: "3%" }}>
              <TextBoxContainer
                label="Landmark"
                name="landmark"
                value={
                  this.props.fullAddress.length === undefined
                    ? this.props.fullAddress.landmark
                    : ""
                }
                onBlur={this.handleOnBlur}
                regex={""}
                type="text"
              />
            </div>
          </div>

          <TextBoxContainer
            label="Type Home Office etc"
            name="type"
            value={
              this.props.fullAddress.length === undefined
                ? this.props.fullAddress.type
                : ""
            }
            disabled={
              this.props.fullAddress.length === undefined ? true : false
            }
            onBlur={this.handleOnBlur}
            regex={""}
            type="text"
          />

          <TextBoxContainer
            label="Receivers Phone No"
            name="receiverphoneno"
            value={
              this.props.fullAddress.length === undefined
                ? this.props.fullAddress.receivers_phone_no
                : localStorage.getItem("loggedInUserPhoneNo")
            }
            onBlur={this.handleOnBlur}
            regex={this.phoneNoRegex}
            type="text"
          />
        </div>
        <div className="w3-row">
          <div className="w3-col s6" style={{ paddingRight: "3%" }}>
            <button
              onClick={this.handleSaveAddressCick}
              className="w3-border w3-small w3-padding-small w3-border-black w3-btn w3-white"
              style={{ width: "100%" }}
            >
              {this.props.fullAddress.length === undefined ? "Update" : "Save"}
            </button>
          </div>
          <div className="w3-col s6" style={{ paddingLeft: "3%" }}>
            <button
              onClick={this.props.cancelAddAddressClicked}
              className="w3-border w3-small w3-text-red w3-padding-small w3-border-black w3-btn w3-white"
              style={{ width: "100%" }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddAddressForm;
