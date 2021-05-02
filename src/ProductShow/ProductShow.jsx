import React, { Component } from "react";
import "./ProductShow.css";
import Loader from "../Loader/Loader";
import ArrayIdentifier from "../ArrayIdentifier/ArrayIdentifier";
import { getApiEndpoint } from "../apiEndpoint";
import Modal from "../Modal/Modal";

export class ProductShow extends Component {
  constructor() {
    super();
    this.state = {
      productPictureCounter: 0,
      productCurrentPicture: "",
      filterContainerShow: false,
      heartShow: false,
      productDescUp: false,
      isLoaded: false,
      data: [],
      isLoveLoaded: false,
      dataLove: [],
      isProductLoved: false,
      dataIsProductLoved: [],
      dataProductPictures: [],
      isProductPicturesLoaded: false,
      size: "",
      modal: false,
      modalMessage: "",
    };
    this.touchStartEndAxisDifference = 0;
  }

  componentDidMount() {
    fetch(`${getApiEndpoint()}/api/getproduct/${this.props.productId}`)
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            data: data,
            productCurrentPicture: data[0].product_picture,
            size: data[0].product_sex === 5 ? "L" : "",
          });
          this.fetchTotalLove();
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  fetchTotalLove = () => {
    fetch(`${getApiEndpoint()}/api/getProductTotalLove/${this.props.productId}`)
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            dataLove: data,
            isLoveLoaded: true,
          });
          this.fetchProductPictures();
        },
        (error) => {
          this.setState({
            errorLove: error,
          });
        }
      );
  };

  fetchProductPictures = () => {
    fetch(`${getApiEndpoint()}/api/getProductPictures/${this.props.productId}`)
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            dataProductPictures: data,
            isProductPicturesLoaded: true,
          });
          this.fetchIsProductLoved();
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  };

  fetchIsProductLoved = () => {
    if (localStorage.getItem("loggedInUserPhoneNo") != null) {
      fetch(
        `${getApiEndpoint()}/api/getProductIsLove/${
          this.props.productId
        }/${localStorage.getItem("loggedInUserPhoneNo")}`
      )
        .then((res) => res.json())
        .then(
          (data) => {
            this.setState({ isProductLoved: data.length ? true : false });
          },
          (error) => {
            this.setState({
              error,
            });
          }
        );
    }
  };

  addLove = () => {
    fetch(
      `${getApiEndpoint()}/api/makeProductLove/${localStorage.getItem(
        "loggedInUserPhoneNo"
      )}/${this.props.productId}`
    )
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            isProductLoved:
              data.length !== 0 ? (data[0].code === 100 ? true : false) : false,
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  };

  handleFilterClick = () => {
    this.setState({ filterContainerShow: !this.state.filterContainerShow });
  };

  handleProductImageDoubleClick = () => {
    if (
      localStorage.getItem("loggedInUserPhoneNo") != null &&
      !this.state.isProductLoved
    ) {
      this.addLove();
    }
    this.setState({ heartShow: true });
    setTimeout(() => {
      this.setState({ heartShow: false });
    }, 2000);
  };

  handleProductDescUpClick = () => {
    this.setState({ productDescUp: !this.state.productDescUp });
  };

  handleTouchStart = (e) => {
    this.touchStartEndAxisDifference = e.touches[0].clientX;
  };

  hanldeTouchEnd = (e) => {
    //alert(this.touchStartEndAxisDifference - e.changedTouches[0].clientX);
    if (this.touchStartEndAxisDifference - e.changedTouches[0].clientX > 50)
      this.showNextImage();
    if (this.touchStartEndAxisDifference - e.changedTouches[0].clientX < -50)
      this.showPreviousImage();
    //  this.showNextImage();
    // else this.showPreviousImage();
  };

  showNextImage = () => {
    this.setState(
      {
        productPictureCounter:
          this.state.productPictureCounter <
          this.state.dataProductPictures.length - 1
            ? this.state.productPictureCounter + 1
            : 0,
      },
      () => {
        this.setState({
          productCurrentPicture: this.state.dataProductPictures[
            this.state.productPictureCounter
          ].picture_path,
        });
      }
    );
  };

  showPreviousImage = () => {
    this.setState(
      {
        productPictureCounter:
          this.state.productPictureCounter > 0
            ? this.state.productPictureCounter - 1
            : this.state.dataProductPictures.length - 1,
      },
      () => {
        this.setState({
          productCurrentPicture: this.state.dataProductPictures[
            this.state.productPictureCounter
          ].picture_path,
        });
      }
    );
  };

  handleSelectChange = (e) => {
    this.setState({ size: e.target.value }, () => {
      console.log(this.state.size);
    });
  };

  handleAddClick = () => {
    if (this.state.size === "")
      this.setState({ modal: true, modalMessage: "Please select a size" });
    else
      this.props.addProductToCartClicked(
        this.state.data[0].product_id,
        this.state.size
      );
  };

  handleCloseModalClick = () => {
    this.setState({ modal: false });
  };

  render() {
    const {
      data,
      isLoaded,
      error,
      dataLove,
      isProductLoved,
      isProductPicturesLoaded,
    } = this.state;
    if (error) {
      return <div>Seomthing went wrong please refresh the page</div>;
    } else if (!isLoaded && !isProductPicturesLoaded) {
      return <Loader />;
    } else {
      return (
        <div
          className="productShow"
          onDoubleClick={this.handleProductImageDoubleClick}
        >
          {this.state.modal && (
            <Modal
              closeModalClicked={this.handleCloseModalClick}
              message={this.state.modalMessage}
            />
          )}
          <div
            onTouchStart={
              isProductPicturesLoaded
                ? (e) => {
                    this.handleTouchStart(e);
                  }
                : ""
            }
            onTouchEndCapture={
              isProductPicturesLoaded
                ? (e) => {
                    this.hanldeTouchEnd(e);
                  }
                : ""
            }
            className="productImageContainer w3-display-container"
            style={{
              backgroundImage: `
                url(${this.state.productCurrentPicture})`,
            }}
          >
            {/*<img
              src={data[0].product_picture}
              alt="Lights"
              className="productImage"
              onDoubleClick={this.handleProductImageDoubleClick}
            />*/}
            <div
              className="w3-display-topright w3-container"
              style={{ marginTop: 10 }}
            >
              {/*<div className="productFilter" onClick={this.handleFilterClick}>
                <i className="fa fa-circle iconOnproductImage marginRightOnIcon"></i>
                Filters
          </div>*/}
              <div
                className={`sizeFilterContainer ${
                  this.state.filterContainerShow ? "w3-animate-top" : "w3-hide"
                }`}
              >
                <div className="w3-large">Size</div>
                <div>
                  <span className="w3-regular size">S</span>
                  <span className="w3-regular size">M</span>
                  <span className="w3-regular size">L</span>
                </div>
              </div>
              {data[0].in_stock === 0 ? (
                <div className="outOfStock">Product is out of stock</div>
              ) : (
                ""
              )}
            </div>
            <div
              className="w3-display-topleft w3-container"
              style={{ marginTop: 10 }}
            >
              <i
                className="fa fa-arrow-left iconOnproductImage"
                onClick={this.props.productCloseClicked}
              ></i>
            </div>
            <div className="w3-display-right w3-container">
              <i
                onClick={this.showNextImage}
                className={`fa fa-angle-right iconOnproductImage ${
                  isProductPicturesLoaded ? "" : "w3-hide"
                }`}
              ></i>
            </div>
            <div
              className={`w3-display-middle w3-container animated  ${
                this.state.heartShow ? "fadeIn" : "w3-hide"
              }`}
            >
              <i className="fa fa-heart iconOnproductImage heartOnDoubleTap"></i>
            </div>
            <div className="w3-display-left w3-container">
              <i
                onClick={this.showPreviousImage}
                className={`fa fa-angle-left iconOnproductImage ${
                  isProductPicturesLoaded ? "" : "w3-hide"
                }`}
              ></i>
            </div>
            <div
              className="w3-display-bottommiddle"
              style={{ marginBottom: 10 }}
            >
              {this.state.dataProductPictures.map((currentData, index) => (
                <ArrayIdentifier
                  key={index}
                  componentKey={index}
                  currentPictureIndex={this.state.productPictureCounter}
                />
              ))}
            </div>
            <div
              className="w3-display-bottomright w3-container"
              style={{ marginBottom: 10 }}
            >
              <span>
                <i
                  style={{ color: isProductLoved ? "#B4252D" : "grey" }}
                  className="fa fa-heart iconOnproductImage notLoved marginRightOnIcon"
                ></i>
              </span>
              {/*<span>
                <i className="fa fa-shopping-cart iconOnproductImage marginRightOnIcon"></i>
              </span>
              <span>
                <i className="fa fa-share-alt iconOnproductImage marginRightOnIcon"></i>
              </span>*/}
            </div>
          </div>

          <div className="w3-middle w3-row" style={{ marginTop: "10%" }}>
            <div className="s6 w3-col">
              <i
                className="fa fa-heart iconOnproductImage"
                style={{ fontSize: "40px" }}
              ></i>
              <div>
                {this.state.isLoveLoaded ? dataLove[0].totalCount : "Loading.."}{" "}
                Loves
              </div>
            </div>
            <div className="s6 w3-col">
              <i
                className="fa fa-share-alt iconOnproductImage"
                style={{ fontSize: "40px" }}
              ></i>
              <div>0 Shares</div>
            </div>
          </div>

          <div
            className={`productDescriptionContainer ${
              this.state.productDescUp
                ? "productDescContainerUp"
                : "productDescContainerDown"
            }`}
          >
            <i
              onClick={this.handleProductDescUpClick}
              className={`fa ${
                this.state.productDescUp ? "fa-angle-down" : "fa-angle-up"
              } iconOnproductImage`}
            ></i>
            <div className="productDescription w3-row">
              <div className="w3-col s6">
                <div className="productNameandPriceContainer">
                  <div className="productName">{data[0].product_name}</div>
                  <div className="productPrice">
                    &#8377;{" "}
                    {data[0].product_price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                </div>
                <div style={{ marginTop: 5 }}>
                  <button
                    disabled={data[0].in_stock === 1 ? false : true}
                    onClick={this.handleAddClick}
                    className="w3-btn button w3-large w3-white w3-border w3-border-black"
                    style={{ width: "30%" }}
                  >
                    ADD
                  </button>
                  <select
                    disabled={data[0].product_sex === 5 ? true : false}
                    className={`w3-select w3-tiny w3-border w3-white ${
                      this.state.size === "" ? "w3-border-red" : ""
                    }`}
                    name="option"
                    value={this.state.size}
                    onChange={this.handleSelectChange}
                    style={{
                      width: "50px",
                      marginLeft: "10px",
                      height: "32px",
                    }}
                  >
                    <option value="" disabled selected>
                      Size
                    </option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="XXXL">XXXL</option>
                  </select>
                </div>
              </div>
              <div className="w3-col s6">
                <div className="productDescriptionText">
                  {data[0].product_description}
                </div>
              </div>
            </div>
            <div className="w3-text-gray" style={{ marginTop: "5%" }}>
              Pay what you see everything is included
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ProductShow;
