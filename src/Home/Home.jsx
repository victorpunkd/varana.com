import React, { Component } from "react";
import "./Home.css";
import SideBar from "../SideBar/SideBar";
import HomeIntro from "../HomeIntro/HomeIntro";
//import Collection from "../Collection/Collection";
import ProductsUnderCollection from "../ProductsUnderCollection/ProductsUnderCollection";
//import Search from "../Search/Search";

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      sideBarShow: false,
      headerText: "Apparel",
      collectionSex: 0,
      body: "",
      clickedCollectionId: 0,
      clickedCollectionName: "",
    };
  }

  barsClicked = () => {
    this.setState({ sideBarShow: !this.state.sideBarShow });
  };

  handleSexClick = (sex) => {
    this.setState({
      collectionSex: sex,
      clickedCollectionId: 0,
      body: "ProductsUnderCollection",
      sideBarShow: false,
    });
    this.props.sexUnderHomeClicked(sex);
  };

  handleCollectionClick = (collectionId, collectionName) => {
    this.setState(
      {
        // headerText: collectionName,
        clickedCollectionId: collectionId,
        clickedCollectionName: collectionName,
        collectionSex: 4,
        body: "ProductsUnderCollection",
        sideBarShow: false,
      },
      function () {
        this.props.sexUnderHomeClicked(this.state.collectionSex);
      }
    );
  };

  // handleProductClick = productId => {
  //   this.props.productClicked(productId);
  // };

  render() {
    return (
      <div className="apparel">
        {/*<Search color={this.state.collectionSex === 0 ? "white" : "black"} />*/}
        <div
          className="apparelHeading"
          style={{
            color: this.state.collectionSex !== 0 ? "#B4252D" : "white",
          }}
        >
          <i onClick={this.barsClicked} className="fa fa-bars" />
          {/*<span> {this.state.headerText}</span>*/}
        </div>
        {this.state.sideBarShow === true && (
          <SideBar
            contactUsClicked={this.props.contactUsClicked}
            aboutClicked={this.props.aboutClicked}
            collectionClicked={this.handleCollectionClick}
          />
        )}

        <div
          className={
            this.state.collectionSex !== 0
              ? "apparelSex"
              : "apparelSexInHomeIntro"
          }
          style={{
            color: this.state.collectionSex !== 0 ? "#B4252D" : "white",
          }}
        >
          <span
            onClick={() => this.handleSexClick(1)}
            className={`apparelSexOption ${
              this.state.collectionSex === 1 ? "active" : ""
            }`}
            style={{ marginLeft: -5 }}
          >
            DHAKA
          </span>
          <span
            onClick={() => this.handleSexClick(2)}
            className={`apparelSexOption ${
              this.state.collectionSex === 2 ? "active" : ""
            }`}
          >
            KHASTO
          </span>
          <span
            onClick={() => this.handleSexClick(3)}
            className={`apparelSexOption ${
              this.state.collectionSex === 3 ? "active" : ""
            }`}
          >
            ACCESSORIES
          </span>
        </div>
        {this.state.collectionSex === 0 && (
          <HomeIntro handleSexClick={this.handleSexClick} />
        )}
        {/*code for previous design */}
        {/*this.state.body === "Apparel" && (
          <Collection
            overlay={this.state.sideBarShow}
            collectionClicked={this.handleCollectionClick}
            sex={this.state.collectionSex}
          />
        )*/}
        <div className="productCardsContainer">
          {this.state.body === "ProductsUnderCollection" && (
            <ProductsUnderCollection
              productSex={this.state.collectionSex}
              productClicked={this.props.productClicked}
              collectionId={this.state.clickedCollectionId}
              collectionName={this.state.clickedCollectionName}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Home;
