import React, { Component } from "react";
import "./OrderTrackDetails.css";
import Loader from "../Loader/Loader";
import { getApiEndpoint } from "../apiEndpoint";
import ProductCardForCart from "../ProductCardForCart/ProductCardForCart";

export class OrderTrackDetails extends Component {
  constructor() {
    super();
    this.state = {
      dataProductInfoFromDB: [],
      dataProductInfo: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch(`${getApiEndpoint()}/api/getOrderDetails/${this.props.order_id}`)
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            dataProductInfoFromDB: data
          });
          let productIDArray = [];
          for (let i = 0; i < this.state.dataProductInfoFromDB.length; i++)
            productIDArray = [
              this.state.dataProductInfoFromDB[i].product_id,
              ...productIDArray
            ];
          this.fetchProductDetails(productIDArray);
        },
        error => {
          this.setState({
            error
          });
        }
      );
  }

  fetchProductDetails = productIDArray => {
    fetch(`${getApiEndpoint()}/api/getProductArray/${productIDArray}`)
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            isLoaded: true,
            dataProductInfo: data
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

  render() {
    const {
      dataProductInfo,
      dataProductInfoFromDB,
      isLoaded,
      error
    } = this.state;
    if (error) {
      return <div>Seomthing went wrong please refresh the page</div>;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      return (
        <div className="orderTrackDetails">
          <div className="mainHeading">Order Details</div>
          <div className="orderDetailsBody">
            <div>
              Order ID - <b>{this.props.order_id}</b>
            </div>
            <div className="orderProductCards">
              {dataProductInfo.map(data => (
                <ProductCardForCart
                  key={data.product_id}
                  product_id={data.product_id}
                  product_name={data.product_name}
                  product_price={data.product_price}
                  product_description={data.product_description}
                  product_picture={data.product_picture}
                  size={dataProductInfoFromDB.filter(
                    dataLocal => dataLocal.product_id === data.product_id
                  )}
                  itemCount={
                    dataProductInfoFromDB.filter(
                      el => el.product_id === data.product_id
                    )[0].productCount
                  }
                  controlShow={false}
                />
              ))}
              {console.log(dataProductInfoFromDB)}
              {console.log(dataProductInfo)}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default OrderTrackDetails;
