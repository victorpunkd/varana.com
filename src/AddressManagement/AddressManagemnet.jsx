import React, { Component } from "react";
import "./AddressManagement.css";
import "../AddressCard/AddressCard";
import AddressCard from "../AddressCard/AddressCard";
import { getApiEndpoint } from "../apiEndpoint";
import Loader from "../Loader/Loader";
import AddAddressForm from "../AddAddressForm/AddAddressForm";

export class AddressManagemnet extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoaded: false,
      addAddress: false,
      fullAddress: []
    };
  }

  componentDidMount() {
    this.getAddress();
  }

  getAddress = () => {
    fetch(
      `${getApiEndpoint()}/api/getAddress/${localStorage.getItem(
        "loggedInUserPhoneNo"
      )}`
    )
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            isLoaded: true,
            data: data
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  handleRemoveAddress = addressType => {
    fetch(
      `${getApiEndpoint()}/api/deleteAddress/${localStorage.getItem(
        "loggedInUserPhoneNo"
      )}/${addressType}`
    )
      .then(res => res.json())
      .then(
        data => {
          if (data.length > 0 && data[0].code === 100) {
            alert("Address deleted");
            this.getAddress();
          }
        },
        error => {
          this.setState({
            error
          });
        }
      );
  };

  handleAddAddressClick = () => {
    this.setState({ fullAddress: [], addAddress: true });
  };

  handleAddAddressCancelClick = () => {
    this.setState({ addAddress: false });
  };

  handleEditAddressClick = addressType => {
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].type === addressType)
        this.setState({
          fullAddress: this.state.data[i],
          addAddress: true
        });
    }
  };

  handleMakeDefaultAddressClick = addressType => {
    fetch(
      `${getApiEndpoint()}/api/makeDefaultAddress/${localStorage.getItem(
        "loggedInUserPhoneNo"
      )}/${addressType}`
    )
      .then(res => res.json())
      .then(
        data => {
          if (data[0].code === 100) {
            this.getAddress();
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

  handleAddAddressSuccessfullClick = () => {
    this.setState({ addAddress: false });
    this.getAddress();
  };

  render() {
    const { isLoaded, error, data } = this.state;
    if (error) {
      return <div>Seomthing went wrong please refresh the page</div>;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      return (
        <div className="addressManagement">
          <div className="secondaryTextFont w3-text-large">
            MANAGE ADDRESSES
          </div>
          <div>
            {this.state.addAddress ? (
              ""
            ) : (
              <button
                onClick={this.handleAddAddressClick}
                className="button w3-btn w3-black"
              >
                Add Address
              </button>
            )}
          </div>
          <div className="addressCardContainers">
            {this.state.addAddress ? (
              <AddAddressForm
                cancelAddAddressClicked={this.handleAddAddressCancelClick}
                addAddressSuccessfull={this.handleAddAddressSuccessfullClick}
                fullAddress={this.state.fullAddress}
              />
            ) : (
              ""
            )}
            {this.state.addAddress
              ? ""
              : data.map(data => (
                  <AddressCard
                    key={data.type}
                    type={data.type}
                    address={data.address}
                    locality={data.locality}
                    city={data.city}
                    state={data.state}
                    pincode={data.pincode}
                    landmark={data.landmark}
                    receiversPhoneNo={data.receivers_phone_no}
                    isDeafultAddress={data.is_default_address}
                    editAddressClicked={this.handleEditAddressClick}
                    removeAddressClicked={this.handleRemoveAddress}
                    makeDeafultAddressClicked={
                      this.handleMakeDefaultAddressClick
                    }
                  />
                ))}
            {data.length < 1 && !this.state.addAddress ? (
              <div>You havent added any address yet</div>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    }
  }
}

export default AddressManagemnet;
