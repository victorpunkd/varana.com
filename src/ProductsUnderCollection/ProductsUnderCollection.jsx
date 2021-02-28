import React, { Component } from "react";
import "./ProductsUnderCollection.css";
import Loader from "../Loader/Loader";
import MainProductContainer from "../MainProductContainer/MainProductContainer";
import ProductShowCard from "../ProductShowCard/ProductShowCard";
import { getApiEndpoint } from "../apiEndpoint";

export class ProductsUnderCollection extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      data: [],
      dataTemp: [],
      showScroll: false,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.productSex !== this.props.productSex &&
      this.props.productSex !== 4
    ) {
      this.fetchData();
      window.scrollTo(0, 0);
    }
    if (
      prevProps.collectionId !== this.props.collectionId &&
      this.props.collectionId !== 0
    ) {
      this.fetchCollectionData();
      window.scrollTo(0, 0);
    }
  };

  componentDidMount() {
    if (
      this.props.productSex !== 0 &&
      this.props.productSex !== 4 &&
      this.props.collectionId === 0
    )
      this.fetchData();
    else this.fetchCollectionData();
  }

  fetchCollectionData() {
    fetch(
      `${getApiEndpoint()}/api/getProductByCollection/${
        this.props.collectionId
      }`
    )
      .then((res) => res.json())
      .then(
        (dataFromFetch) => {
          if (dataFromFetch.length > 0) {
            this.setState({
              isLoaded: true,
              data: dataFromFetch,
            });
          } else {
            this.setState({
              isLoaded: true,
              data: dataFromFetch,
            });
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  fetchData() {
    fetch(`${getApiEndpoint()}/api/product/${this.props.productSex}`)
      .then((res) => res.json())
      .then(
        (dataFromFetch) => {
          if (dataFromFetch.length > 0) {
            this.setState({
              isLoaded: true,
              data: dataFromFetch,
            });
          } else {
            this.setState({
              isLoaded: true,
              data: dataFromFetch,
            });
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { data, isLoaded, error } = this.state;
    if (error) {
      return <div>Seomthing went wrong please refresh the page</div>;
    } else if (!isLoaded) {
      return <Loader />;
    } else if (data.length <= 0) {
      return <div>No Product Found Under This Collection</div>;
    } else {
      return (
        <div className="productsUnderCollection">
          <div className="sexHeading">
            {this.props.productSex === 1
              ? "DHAKA"
              : this.props.productSex === 2
              ? "KHASTO"
              : this.props.productSex === 3
              ? "ACCESSORIES"
              : this.props.productSex === 4
              ? this.props.collectionName
              : ""}
          </div>
          <MainProductContainer
            data={data[0]}
            productClicked={this.props.productClicked}
            side="left"
          />
          <div className="w3-row-padding" id="scrollIdentifier">
            {data.slice(1, data.length).map((product, index) => (
              <ProductShowCard
                index={index}
                key={product.product_id}
                product_id={product.product_id}
                product_picture={product.product_picture}
                product_name={product.product_name}
                product_price={product.product_price}
                productClicked={this.props.productClicked}
              />
            ))}
          </div>
          <div
            className={`${this.state.showScroll ? "" : "w3-hide"}`}
            style={{
              position: "absolute",
              bottom: 10,
              textAlign: "center",
              width: "100%",
              color: "white",
            }}
          >
            <div>
              <i className="fa fa-arrow-down" aria-hidden="true"></i>
            </div>
            Scroll Down to see more
          </div>
        </div>
      );
    }
  }
}

export default ProductsUnderCollection;
