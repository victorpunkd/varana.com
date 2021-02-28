import React, { Component } from "react";
import "./SideBar.css";
import Loader from "../Loader/Loader";
import { getApiEndpoint } from "../apiEndpoint";

export class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      activeGenderSection: "Women",
      data: [],
      isLoaded: false,
      women: [],
      men: [],
      unisex: [],
      clearance: [],
      accessories: [],
      stationaries: [],
      onorder: [],
      mask: [],
    };
  }
  handleWomenClick = () => {
    this.setState({ activeGenderSection: "Women" });
  };

  handleMenClick = () => {
    this.setState({ activeGenderSection: "Men" });
  };

  handleUnisexClick = () => {
    this.setState({ activeGenderSection: "Unisex" });
  };

  handleClearanceClick = () => {
    this.setState({ activeGenderSection: "Clearance" });
  };

  handleAccessoriesClick = () => {
    this.setState({ activeGenderSection: "Accessories" });
  };

  handleStationaryClick = () => {
    this.setState({ activeGenderSection: "Stationary" });
  };

  handleOnorderClick = () => {
    this.setState({ activeGenderSection: "Onorder" });
  };

  handleMaskClick = () => {
    this.setState({ activeGenderSection: "Mask" });
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch(`${getApiEndpoint()}/api/collection/1,2,3,4,5,6,7,8`)
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            data: data,
            women: data.filter((data) => data.collection_sex === 1),
            men: data.filter((data) => data.collection_sex === 2),
            unisex: data.filter((data) => data.collection_sex === 3),
            clearance: data.filter((data) => data.collection_sex === 4),
            accessories: data.filter((data) => data.collection_sex === 5),
            stationaries: data.filter((data) => data.collection_sex === 6),
            onorder: data.filter((data) => data.collection_sex === 7),
            mask: data.filter((data) => data.collection_sex === 8),
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  render() {
    const {
      women,
      men,
      unisex,
      clearance,
      isLoaded,
      error,
      accessories,
      stationaries,
      onorder,
      mask,
    } = this.state;
    if (error) {
      return <div>Seomthing went wrong please refresh the page</div>;
    } else if (!isLoaded) {
      return (
        <div className="w3-sidebar w3-white sideBar w3-animate-left">
          <div className="sideBarHeading">
            Collection
            <Loader />
          </div>
        </div>
      );
    } else {
      return (
        <div className="w3-sidebar w3-white sideBar w3-animate-left">
          <div className="sideBarHeading">Collection</div>
          <div className="section">
            <div
              onClick={this.handleWomenClick}
              className={`sectionHeading ${
                this.state.activeGenderSection === "Women" ? "active" : ""
              }`}
            >
              WOMEN
            </div>
            <div
              className={`sectionItems w3-animate-left ${
                this.state.activeGenderSection === "Women" ? "" : "w3-hide"
              }`}
            >
              {women.map((collections) => (
                <div
                  className="itemInCollection"
                  key={collections.collection_id}
                  onClick={() => {
                    this.props.collectionClicked(
                      collections.collection_id,
                      collections.collection_name
                    );
                  }}
                >
                  {collections.collection_name}
                </div>
              ))}
            </div>
          </div>
          <div className="section">
            <div
              onClick={this.handleMenClick}
              className={`sectionHeading ${
                this.state.activeGenderSection === "Men" ? "active" : ""
              }`}
            >
              MEN
            </div>
            <div
              className={`sectionItems w3-animate-left ${
                this.state.activeGenderSection === "Men" ? "" : "w3-hide"
              }`}
            >
              {men.map((collections) => (
                <div
                  className="itemInCollection"
                  key={collections.collection_id}
                  onClick={() => {
                    this.props.collectionClicked(
                      collections.collection_id,
                      collections.collection_name
                    );
                  }}
                >
                  {collections.collection_name}
                </div>
              ))}
            </div>
          </div>
          <div className="section">
            <div
              onClick={this.handleUnisexClick}
              className={`sectionHeading ${
                this.state.activeGenderSection === "Unisex" ? "active" : ""
              }`}
            >
              UNISEX
            </div>
            <div
              className={`sectionItems w3-animate-left ${
                this.state.activeGenderSection === "Unisex" ? "" : "w3-hide"
              }`}
            >
              {unisex.map((collections) => (
                <div
                  className="itemInCollection"
                  key={collections.collection_id}
                  onClick={() => {
                    this.props.collectionClicked(
                      collections.collection_id,
                      collections.collection_name
                    );
                  }}
                >
                  {collections.collection_name}
                </div>
              ))}
            </div>
          </div>
          <div className="section">
            <div
              onClick={this.handleMaskClick}
              className={`sectionHeading ${
                this.state.activeGenderSection === "Mask" ? "active" : ""
              }`}
            >
              MASK
            </div>
            <div
              className={`sectionItems w3-animate-left ${
                this.state.activeGenderSection === "Mask" ? "" : "w3-hide"
              }`}
            >
              {mask.map((collections) => (
                <div
                  className="itemInCollection"
                  key={collections.collection_id}
                  onClick={() => {
                    this.props.collectionClicked(
                      collections.collection_id,
                      collections.collection_name
                    );
                  }}
                >
                  {collections.collection_name}
                </div>
              ))}
            </div>
          </div>
          <div className="section">
            <div
              onClick={this.handleClearanceClick}
              className={`sectionHeading ${
                this.state.activeGenderSection === "Clearance" ? "active" : ""
              }`}
            >
              CLEARANCE CORNER
            </div>
            <div
              className={`sectionItems w3-animate-left ${
                this.state.activeGenderSection === "Clearance" ? "" : "w3-hide"
              }`}
            >
              {clearance.map((collections) => (
                <div
                  className="itemInCollection"
                  key={collections.collection_id}
                  onClick={() => {
                    this.props.collectionClicked(
                      collections.collection_id,
                      collections.collection_name
                    );
                  }}
                >
                  {collections.collection_name}
                </div>
              ))}
            </div>
          </div>
          <div className="section">
            <div
              onClick={this.handleAccessoriesClick}
              className={`sectionHeading ${
                this.state.activeGenderSection === "Accessories" ? "active" : ""
              }`}
            >
              ACCESSORIES
            </div>
            <div
              className={`sectionItems w3-animate-left ${
                this.state.activeGenderSection === "Accessories"
                  ? ""
                  : "w3-hide"
              }`}
            >
              {accessories.map((collections) => (
                <div
                  className="itemInCollection"
                  key={collections.collection_id}
                  onClick={() => {
                    this.props.collectionClicked(
                      collections.collection_id,
                      collections.collection_name
                    );
                  }}
                >
                  {collections.collection_name}
                </div>
              ))}
            </div>
          </div>
          <div className="section">
            <div
              onClick={this.handleStationaryClick}
              className={`sectionHeading ${
                this.state.activeGenderSection === "Stationary" ? "active" : ""
              }`}
            >
              STATIONARY
            </div>
            <div
              className={`sectionItems w3-animate-left ${
                this.state.activeGenderSection === "Stationary" ? "" : "w3-hide"
              }`}
            >
              {stationaries.map((collections) => (
                <div
                  className="itemInCollection"
                  key={collections.collection_id}
                  onClick={() => {
                    this.props.collectionClicked(
                      collections.collection_id,
                      collections.collection_name
                    );
                  }}
                >
                  {collections.collection_name}
                </div>
              ))}
            </div>
          </div>
          <div className="section">
            <div
              onClick={this.handleOnorderClick}
              className={`sectionHeading ${
                this.state.activeGenderSection === "Onorder" ? "active" : ""
              }`}
            >
              ON-ORDER
            </div>
            <div
              className={`sectionItems w3-animate-left ${
                this.state.activeGenderSection === "Onorder" ? "" : "w3-hide"
              }`}
            >
              {console.log(this.state.onorder)}
              {onorder.map((collections) => (
                <div
                  className="itemInCollection"
                  key={collections.collection_id}
                  onClick={() => {
                    this.props.collectionClicked(
                      collections.collection_id,
                      collections.collection_name
                    );
                  }}
                >
                  {collections.collection_name}
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <div
              className="sectionHeading"
              style={{ marginTop: "10%" }}
              onClick={this.props.aboutClicked}
            >
              ABOUT
            </div>
          </div>
          <div className="section">
            <div
              className="sectionHeading"
              style={{ marginTop: "-10%" }}
              onClick={this.props.contactUsClicked}
            >
              CONTACT US
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SideBar;
