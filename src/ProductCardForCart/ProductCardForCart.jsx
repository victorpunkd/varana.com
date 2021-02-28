import React, { Component } from "react";
import "./ProductCardForCart.css";

export class ProductCardForCart extends Component {
  render() {
    return (
      <div className="productCard w3-row">
        <div className="s6 w3-col" style={{ textAlign: "left" }}>
          <div style={{ fontWeight: 500 }}>
            {this.props.product_name}
            <span style={{ fontWeight: 700 }}> X {this.props.itemCount}</span>
          </div>
          <div style={{ fontSize: 10 }}>{this.props.product_description}</div>
          <div style={{ marginTop: 10, fontSize: 10 }}>
            &#8377;{" "}
            {(this.props.product_price * this.props.itemCount)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <div>
            {this.props.controlShow
              ? this.props.size.map(data => (
                  <span style={{ marginLeft: 5 }}>{data}</span>
                ))
              : this.props.size[0].size}
          </div>
          {this.props.controlShow ? (
            <div style={{ marginTop: 10 }} className="w3-small">
              <span>
                <i
                  onClick={() =>
                    this.props.minusButtonClicked(
                      this.props.product_id,
                      this.props.itemCount,
                      this.props.size
                    )
                  }
                  className="fa fa-minus"
                  aria-hidden="true"
                ></i>
                <span
                  style={{
                    padding: "0px 10px",
                    border: "1px solid gray",
                    marginLeft: "5%",
                    marginRight: "5%"
                  }}
                >
                  {this.props.itemCount}
                </span>
                <i
                  onClick={() =>
                    this.props.plusButtonClicked(
                      this.props.product_id,
                      this.props.product_sex
                    )
                  }
                  className="fa fa-plus"
                  aria-hidden="true"
                ></i>
              </span>
              <span style={{ marginLeft: "5%" }}>
                <i
                  onClick={() =>
                    this.props.removeButtonClicked(this.props.product_id)
                  }
                  className="fa fa-trash w3-text-red"
                  aria-hidden="true"
                ></i>
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="s6 w3-col">
          <div
            style={{
              width: 100,
              height: 150,
              float: "right"
            }}
          >
            <img
              src={this.props.product_picture}
              alt="ProductImage"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCardForCart;
