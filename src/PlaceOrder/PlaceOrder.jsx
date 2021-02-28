import React, { Component } from "react";
import "./PlaceOrder.css";
import { getApiEndpoint } from "../apiEndpoint";
import Loader from "../Loader/Loader";

export class PlaceOrder extends Component {
  constructor() {
    super();
    this.state = {
      defaultAddressdata: [],
      isLoaded: false,
      pyamnetOption: "net",
    };
  }

  componentDidMount() {
    fetch(
      `${getApiEndpoint()}/api/getDefaultAddress/${localStorage.getItem(
        "loggedInUserPhoneNo"
      )}`
    )
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            defaultAddressdata: data,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  handleOnlinePaymentClick = () => {
    this.setState({ pyamnetOption: "net" });
  };

  handleCODClick = () => {
    this.setState({ pyamnetOption: "cod" });
  };

  handlePlaceOrder = () => {
    if (this.state.defaultAddressdata.length < 1) {
      alert("Please select an address to deliver");
      return;
    }

    this.props.placeOrderClicked(
      this.state.defaultAddressdata,
      this.state.pyamnetOption
    );
  };

  render() {
    const { isLoaded, error, defaultAddressdata } = this.state;
    if (error) {
      return <div>Seomthing went wrong please refresh the page</div>;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      return (
        <div className="placeOrder">
          <div className="price secondaryTextFont">
            <div className="w3-border-bottom w3-border-top w3-border-black w3-panel">
              <div>
                <div className="w3-left">Items:</div>
                <div className="w3-right">
                  &#8377;{" "}
                  {this.props.totalCartAmount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
              </div>
              <div style={{ clear: "both" }}>
                <div className="w3-left">Discount (30%):</div>
                <div className="w3-right">
                  &#8377; -
                  {parseInt((parseInt(this.props.totalCartAmount) / 100) * 30)}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 20 }}>
              <div className="w3-left">Order Total: </div>
              <div className="w3-right">
                &#8377;{" "}
                {parseInt(
                  this.props.totalCartAmount -
                    parseInt((parseInt(this.props.totalCartAmount) / 100) * 30)
                )
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
            </div>
          </div>

          <div className="address">
            <div
              onClick={this.props.editAddressClicked}
              className="w3-right w3-text-gray"
              style={{ fontWeight: 500, cursor: "pointer" }}
            >
              EDIT
            </div>
            <div
              className="w3-border-bottom w3-border-black"
              style={{ clear: "both", fontSize: 12 }}
            >
              Shipping to :{" "}
              <span style={{ fontWeight: 500 }}>
                {defaultAddressdata.length > 0 ? (
                  <span>
                    {" "}
                    {defaultAddressdata[0].address},{" "}
                    {defaultAddressdata[0].locality},{" "}
                    {defaultAddressdata[0].city}
                  </span>
                ) : (
                  "No Address Added"
                )}
              </span>
            </div>
          </div>

          <div className="paymentMethod secondaryTextFont">
            <div className="w3-border-bottom w3-border-black">
              SELECT PAYMENT METHOD
            </div>
            <div>
              <label className="container">
                Online Payment
                <input
                  type="radio"
                  onChange={this.handleOnlinePaymentClick}
                  checked={this.state.pyamnetOption === "net" ? "checked" : ""}
                  name="radio"
                />
                <span className="checkmark"></span>
              </label>
              <label className="container">
                Cash On Delivery (COD)
                <input
                  type="radio"
                  onChange={this.handleCODClick}
                  checked={this.state.pyamnetOption === "cod" ? "checked" : ""}
                  name="radio"
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>

          <div className="placeOrderButtonContainer">
            <button
              className="w3-btn w3-black button"
              onClick={this.handlePlaceOrder}
            >
              PLACE YOUR ORDER
            </button>

            <div className="secondaryTextFont" style={{ fontSize: 8 }}>
              By placing your order, you agree to  Varana's privacy notice and
              condition of use.
            </div>
          </div>
        </div>
      );
    }
  }
}

export default PlaceOrder;
