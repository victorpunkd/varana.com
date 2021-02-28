import React, { Component } from "react";
import "./Cart.css";
import ProductCardForCart from "../ProductCardForCart/ProductCardForCart";
import Loader from "../Loader/Loader";
import SizeSelection from "../SizeSelection/SizeSelection";
import { getApiEndpoint } from "../apiEndpoint";

export class Cart extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoaded: false,
      sizeSelectionShow: false,
      sizesToPass: [],
      isMinusOperation: false,
      productId: ""
    };
  }

  getTotalAmount = () => {
    let sum = 0;
    if (this.state.data) {
      for (let i = 0; i < this.state.data.length; i++) {
        sum +=
          this.state.data[i].product_price *
          this.getDuplicateCount(
            this.props.cartData,
            this.state.data[i].product_id
          );
      }
    }
    return sum;
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

  getSize = (array, element) => {
    let size = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].product_id === element) {
        size = [...size, array[i].size];
      }
    }
    return size;
  };

  handleSizeSelectClick = (size, isMinusOperation, product_id) => {
    this.setState({ sizeSelectionShow: false });
    if (isMinusOperation) this.props.minusButtonClicked(product_id, size);
    else this.props.plusButtonClicked(product_id, size);
  };

  componentDidMount() {
    fetch(`${getApiEndpoint()}/api/getProductArray/${this.props.cartData}`)
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

  handleMinusButtonClick = (product_id, product_count, size) => {
    this.setState({
      sizeSelectionShow: true,
      sizesToPass: [...size],
      isMinusOperation: true,
      productId: product_id
    });
    //this.props.minusButtonClicked(product_id);
  };

  handlePlusButtonClick = (product_id, product_sex) => {
    this.setState({
      sizeSelectionShow: true,
      sizesToPass:
        product_sex === 5 ? ["L"] : ["S", "M", "L", "XL", "XXL", "XXXL"],
      isMinusOperation: false,
      productId: product_id
    });
    //this.props.plusButtonClicked(product_id);
  };

  handleRemoveButtonClick = product_id => {
    this.props.removeButtonClicked(product_id);
  };

  render() {
    const { data, isLoaded, error } = this.state;
    if (error) {
      return (
        <div style={{ width: "100%", textAlign: "center" }}>
          Seomthing went wrong please refresh the page{console.log(error)}
        </div>
      );
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      return (
        <div className="cart">
          {this.state.sizeSelectionShow && (
            <SizeSelection
              sizeButtonClicked={this.handleSizeSelectClick}
              sizeToShow={this.state.sizesToPass}
              isMinusOperation={this.state.isMinusOperation}
              productId={this.state.productId}
            />
          )}
          <div className="cartItems w3-display-container">
            <div className="w3-display-topright">
              <i
                className="fa fa-times iconOnproductImage"
                onClick={this.props.cartCloseClicked}
              ></i>
            </div>
          </div>

          <div style={{ textAlign: "left", marginTop: 40 }}>
            <div className="secondaryTextFont" style={{ fontWeight: "500" }}>
              SHOPPING BAG
            </div>
            <div className="secondaryTextFont" style={{ fontSize: "10" }}>
              {data.length} Products
            </div>
          </div>
          <div style={{ width: "100%", maxHeight: "40vh", overflow: "scroll" }}>
            {data.map(data => (
              <ProductCardForCart
                key={data.product_id}
                product_id={data.product_id}
                product_name={data.product_name}
                product_price={data.product_price}
                product_description={data.product_description}
                product_picture={data.product_picture}
                itemCount={this.getDuplicateCount(
                  this.props.cartData,
                  data.product_id
                )}
                minusButtonClicked={this.handleMinusButtonClick}
                plusButtonClicked={this.handlePlusButtonClick}
                removeButtonClicked={this.handleRemoveButtonClick}
                size={this.getSize(this.props.cartDataDetails, data.product_id)}
                product_sex={data.product_sex}
                controlShow={true}
              />
            ))}
          </div>

          <div>
            <div
              className="secondaryTextFont"
              style={{ fontSize: 30, fontWeight: 500 }}
            >
              Total &#8377; {this.getTotalAmount()}
            </div>
            <div
              className="secondaryTextFont"
              style={{ color: "gray", fontSize: 10 }}
            >
              GST Included
            </div>
            <div>
              <button
                className="w3-btn w3-black button"
                style={{ width: "40%", marginTop: 10 }}
                onClick={() => {
                  this.props.shopNowClicked(this.getTotalAmount(), data);
                }}
              >
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Cart;
