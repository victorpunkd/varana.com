import React, { Component } from "react";
import "./MainProductContainer.css";
import Loader from "../Loader/Loader";
import { getApiEndpoint } from "../apiEndpoint";

export class MainProductContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoved: false,
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.product_id !== this.props.data.product_id) {
      this.fetchData();
    }
  }

  fetchData = () => {
    this.setState({ isLoaded: false, isLoved: false });
    if (localStorage.getItem("loggedInUserPhoneNo") != null) {
      fetch(
        `	${getApiEndpoint()}/api/getProductIsLove/${
          this.props.data.product_id
        }/${localStorage.getItem("loggedInUserPhoneNo")}`
      )
        .then((res) => res.json())
        .then(
          (data) => {
            this.setState({
              isLoaded: true,
              data: data,
            });
            if (this.state.data.length !== 0) this.setState({ isLoved: true });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
    } else this.setState({ isLoaded: true });
  };

  render() {
    const { isLoaded, error, isLoved } = this.state;
    if (error) {
      return <div>Seomthing went wrong please refresh the page</div>;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      return (
        <div
          className={`middleProduct animated ${
            this.props.side === "left" ? "zoomIn" : "zoomIn"
          }`}
        >
          <div className="w3-display-container">
            <img
              className="mainProductImage"
              src={this.props.data.product_picture}
              alt="Product"
              onClick={() =>
                this.props.productClicked(this.props.data.product_id)
              }
            />
            <div className="w3-padding w3-display-bottomright">
              <i
                className="fa fa-heart"
                style={{ color: isLoved ? "#e8e3e3" : "#e8e3e3" }}
              ></i>
            </div>
          </div>

          <div className="productInfo">
            <div className="productName">
              {this.props.data.product_name.toUpperCase()}
            </div>
            <div className="productPrice">
              &#8377;{" "}
              {this.props.data.product_price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              <span className="mrpText"> MRP incl. of all taxes</span>
            </div>
          </div>
          <div className="mainContainerExtraInfo">
            <div className="primaryTextMainContainer">
              TRADITIONAL DHAKA FOR MODERN WOMEN
            </div>
            <div className="secondaryTextMainContainer">
              There is a vintage sensibility to many of the styles in our new
              online dhaka collection of women's kurta and dresses. Silk kurta
              with embellished with Dhaka patch works. Wear it with Nepali
              traditional jewelery to make a statement{" "}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default MainProductContainer;
