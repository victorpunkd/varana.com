import React, { Component } from "react";
import "./ProductShowCard.css";
import { getApiEndpoint } from "../apiEndpoint";

export class ProductShowCard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    //this.fetchTotalLove();
  }

  fetchTotalLove = () => {
    fetch(
      `${getApiEndpoint()}/api/getProductTotalLove/${this.props.product_id}`
    )
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            data: data,
            isLoaded: true
          });
        },
        error => {
          this.setState({
            errorLove: error
          });
        }
      );
  };

  render() {
    return (
      <div className="w3-col s6 productConatinerLeft">
        <div className="w3-display-container">
          <img
            className="productImageCard"
            alt={this.props.product_name}
            src={this.props.product_picture}
            onClick={() => this.props.productClicked(this.props.product_id)}
          />
          <div className="w3-padding w3-display-topleft">
            {" "}
            <i className="fa fa-heart" style={{ color: "#e8e3e3" }}></i>
            <div style={{ color: "gray", fontSize: 8 }}>
              {this.state.isLoaded ? this.state.data[0].totalCount : ""}
            </div>
          </div>
        </div>
        <div className="productName">
          {this.props.product_name.toUpperCase()}
        </div>
        <div className="productPrice">
          &#8377;{" "}
          {this.props.product_price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
      </div>
    );
  }
}

export default ProductShowCard;
