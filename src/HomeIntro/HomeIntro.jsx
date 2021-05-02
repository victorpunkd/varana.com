import React, { Component } from "react";
import "./HomeIntro.css";

export class HomeIntro extends Component {
  constructor() {
    super();
    this.state = {
      primaryText: "dhaka",
      secondaryText:
        "Dhaka Originally called Thaka is a traditional hand made fabric of the indegenous Limbu people of eastern nepal",
    };
    this.touchStartEndAxisDifference = 0;
  }

  handleTouchStart = (e) => {
    this.touchStartEndAxisDifference = e.touches[0].clientX;
  };

  hanldeTouchEnd = (e) => {
    if (this.touchStartEndAxisDifference - e.changedTouches[0].clientX > 50)
      this.showNextImage();
    if (this.touchStartEndAxisDifference - e.changedTouches[0].clientX < -50)
      this.showNextImage();
  };

  showNextImage = () => {
    if (this.state.primaryText === "dhaka") {
      this.setState({ primaryText: "khasto" });
      this.setState({
        secondaryText:
          "Three Layers of amazing mul-mul and cotton makes you feel comfortable like never before",
      });
      this.props.categoryChanged("khaasto");
    } else if (this.state.primaryText === "khasto") {
      this.setState({ primaryText: "accessories" });
      this.setState({
        secondaryText:
          "Dhaka Originally called Thaka is a traditional hand made fabric of the indegenous Limbu people of eastern nepal",
      });
      this.props.categoryChanged("accessories");
    } else if (this.state.primaryText === "accessories") {
      this.setState({ primaryText: "dhaka" });
      this.setState({
        secondaryText:
          "accessories description is needed ...... traditional hand made fabric of the indegenous Limbu people of eastern nepal",
      });
      this.props.categoryChanged("dhaka");
    }
  };

  render() {
    return (
      <div
        className="homeIntroContainer"
        onTouchStart={(e) => {
          this.handleTouchStart(e);
        }}
        onTouchEndCapture={(e) => {
          this.hanldeTouchEnd(e);
        }}
      >
        <div
          key={this.state.primaryText}
          className="typeIntro w3-animate-opacity"
        >
          <div className="primaryText">{this.state.primaryText}</div>
          <div className="secondaryText">{this.state.secondaryText}</div>
          <button
            style={{ marginTop: "10px" }}
            className="HomeIntrobutton"
            onClick={() => {
              this.state.primaryText === "dhaka"
                ? this.props.handleSexClick(1)
                : this.state.primaryText === "khasto"
                ? this.props.handleSexClick(2)
                : this.props.handleSexClick(3);
            }}
          >
            Shop
          </button>
        </div>
        <div className="headingText">
          <div>
            <img
              src="https://s3.ap-south-1.amazonaws.com/varana.com-files/static-images/logo/varana-logo-white.png"
              alt="Varana Logo"
              style={{ width: 200, height: 48 }}
            />
          </div>
          {/*<div className="headingPrimaryText">GAMCHA</div>
        <div className="headingSecondaryText">COLLECTION</div>*/}
        </div>
      </div>
    );
  }
}

export default HomeIntro;
