import React, { Component } from "react";
import "./Favourites.css";
import { getApiEndpoint } from "../apiEndpoint";
import Loader from "../Loader/Loader";
import ProductShowCard from "../ProductShowCard/ProductShowCard";

export class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoaded: false
    };
  }
  componentDidMount() {
    if (localStorage.getItem("loggedInUserPhoneNo") != null) {
      this.fetchFavouriteProducts();
    }
  }

  fetchFavouriteProducts = () => {
    fetch(
      `${getApiEndpoint()}/api/getFavourites/${localStorage.getItem(
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

  render() {
    if (this.state.error) {
      return <div>Seomthing went wrong please refresh the page</div>;
    } else if (!this.state.isLoaded) {
      return <Loader />;
    } else {
      return (
        <div className="mainDivFavourites">
          <div className="secondaryTextFont w3-text-large">
            All your favourites are here
          </div>
          <div className="products">
            {console.log(this.state.data)}
            {this.state.data.length < 1 ? (
              <div>
                You havent made any of our products favourite, double tap on
                them to make one
              </div>
            ) : (
              <div className="w3-row">
                {this.state.data.map(product => (
                  <ProductShowCard
                    key={product.product_id}
                    product_id={product.product_id}
                    product_picture={product.product_picture}
                    product_name={product.product_name}
                    product_price={product.product_price}
                    productClicked={this.props.productClicked}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}

export default Favourites;
