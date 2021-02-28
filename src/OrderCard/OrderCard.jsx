import React, { Component } from "react";
import "./OrderCard.css";

export class OrderCard extends Component {
  render() {
    return (
      <div className="orderCard">
        <div className="orderInfo">
          Order Id - <span className="dataStyle">{this.props.order_id}</span>
        </div>
        <div className="orderInfo">
          Total Items -{" "}
          <span className="dataStyle">{this.props.total_item_count}</span>
        </div>
        <div className="orderInfo">
          Amount - <span className="dataStyle">{this.props.total_amount}</span>
        </div>
        <div className="orderInfo">
          <div className="orderStatus">
            Order Status -{" "}
            <span className="dataStyle">{this.props.order_status}</span>
          </div>
        </div>
        <button
          onClick={() => this.props.orderDetailsClicked(this.props.order_id)}
          className="w3-btn w3-black button"
          style={{ marginTop: "5%" }}
        >
          Order Details
        </button>
      </div>
    );
  }
}

export default OrderCard;
