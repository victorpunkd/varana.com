import React, { Component } from "react";
import "./OrderConfirm.css";
import { getApiEndpoint } from "../apiEndpoint";
import Loader from "../Loader/Loader";

export class OrderConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
      orderDetailsData: [],
    };
  }

  componentDidMount() {
    if (this.props.paymentOption === "net") {
      this.onlinePaymet();
    } else this.addOrder();
  }

  onlinePaymet = () => {
    let cartDetailsTemp = this.props.cartDetails;
    for (let i = 0; i < cartDetailsTemp.length; i++) {
      cartDetailsTemp[i].count = this.getDuplicateCount(
        this.props.cartArray,
        cartDetailsTemp[i].product_id
      );
    }
    window.open(
      `${getApiEndpoint()}/api/onlinePayment/${localStorage.getItem(
        "loggedInUserPhoneNo"
      )}/${parseInt(
        this.props.totalCartAmount -
          parseInt((parseInt(this.props.totalCartAmount) / 100) * 30)
      )}/${this.props.cartArray.length}/${
        this.props.deliveryAddress[0].address
      }/${this.props.deliveryAddress[0].locality}/${
        this.props.deliveryAddress[0].city
      }/${this.props.deliveryAddress[0].state}/${
        this.props.deliveryAddress[0].pincode
      }/${this.props.deliveryAddress[0].landmark}/${
        this.props.deliveryAddress[0].receivers_phone_no
      }/${this.props.paymentOption}/${JSON.stringify(this.props.cartDetails, [
        "product_id",
        "product_name",
        "product_price",
        "count",
      ])}/${JSON.stringify(this.props.cartWithSize)}`,
      "_top"
    );
  };

  getDuplicateCount = (array, element) => {
    let i = array.length;
    let totalCount = 0;
    while (i) {
      if (array[i - 1] === element) totalCount++;
      i--;
    }
    return totalCount;
  };

  addOrder = () => {
    console.log(this.props.cartWithSize);
    let cartDetailsTemp = this.props.cartDetails;
    for (let i = 0; i < cartDetailsTemp.length; i++) {
      cartDetailsTemp[i].count = this.getDuplicateCount(
        this.props.cartArray,
        cartDetailsTemp[i].product_id
      );
    }
    fetch(
      `${getApiEndpoint()}/api/addOrder/${localStorage.getItem(
        "loggedInUserPhoneNo"
      )}/${parseInt(
        this.props.totalCartAmount -
          parseInt((parseInt(this.props.totalCartAmount) / 100) * 30)
      )}/${this.props.cartArray.length}/${
        this.props.deliveryAddress[0].address
      }/${this.props.deliveryAddress[0].locality}/${
        this.props.deliveryAddress[0].city
      }/${this.props.deliveryAddress[0].state}/${
        this.props.deliveryAddress[0].pincode
      }/${this.props.deliveryAddress[0].landmark}/${
        this.props.deliveryAddress[0].receivers_phone_no
      }/${this.props.paymentOption}/${JSON.stringify(this.props.cartDetails, [
        "product_id",
        "product_name",
        "product_price",
        "count",
      ])}/${JSON.stringify(this.props.cartWithSize)}`
    )
      .then((res) => res.json())
      .then(
        (data) => {
          if (data[0].code === 100) {
            this.fetchOrderDetails();
            this.props.orderConfirmed();
          }
        },
        (error) => {
          this.setState({
            error,
          });
          alert("Something went wrong please try again later");
          console.log(this.state.error);
        }
      );
  };

  fetchOrderDetails = () => {
    fetch(
      `${getApiEndpoint()}/api/fetchLatestOrder/${localStorage.getItem(
        "loggedInUserPhoneNo"
      )}`
    )
      .then((res) => res.json())
      .then(
        (data) => {
          console.log(data);
          this.setState({
            isLoaded: true,
            orderDetailsData: data,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  render() {
    if (this.state.error) {
      return <div>Seomthing went wrong please refresh the page</div>;
    } else if (!this.state.isLoaded) {
      return <Loader />;
    } else {
      return (
        <div className="orderConfirm">
          <div className="orderReceived">Order Received</div>
          <div className="orderTick">
            <i
              className="fa fa-check-circle"
              style={{ color: "#B4252D" }}
              aria-hidden="true"
            ></i>
          </div>
          <div className="orderID">
            Order Id - <b>{this.state.orderDetailsData[0].order_id}</b>
          </div>
          <div className="orderInfo">
            Total Amount{" "}
            {this.props.paymentOption === "cod" ? " to be paid " : " paid "}
            <b>
              {parseInt(
                this.props.totalCartAmount -
                  parseInt((parseInt(this.props.totalCartAmount) / 100) * 30)
              )}
            </b>
          </div>
          <button
            onClick={this.props.trackOrderClicked}
            className="w3-btn w3-black button"
            style={{ marginTop: "10%" }}
          >
            Track Your Orders
          </button>
        </div>
      );
    }
  }
}

export default OrderConfirm;
