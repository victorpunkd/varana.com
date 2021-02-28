import React, { Component } from "react";
import "./OrderTrack.css";
import OrderCard from "../OrderCard/OrderCard";
import Loader from "../Loader/Loader";
import { getApiEndpoint } from "../apiEndpoint";

export class OrderTrack extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch(
      `${getApiEndpoint()}/api/getAllOrders/${localStorage.getItem(
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
  }

  render() {
    const { data, isLoaded, error } = this.state;
    if (error) {
      return (
        <div>
          Seomthing went wrong please refresh the page{console.log(error)}
        </div>
      );
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      return (
        <div className="orderTrack">
          <div>Track all your orders here</div>
          <div className="trackOrderCards">
            {data.map(data => (
              <OrderCard
                key={data.order_id}
                order_id={data.order_id}
                total_item_count={data.total_item_count}
                total_amount={data.total_amount}
                order_status={data.order_status}
                orderDetailsClicked={this.props.orderDetailsClicked}
              />
            ))}
            {data.length < 1 ? <div>You havent ordered anything yet</div> : ""}
          </div>
        </div>
      );
    }
  }
}

export default OrderTrack;
