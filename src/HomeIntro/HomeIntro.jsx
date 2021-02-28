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
    } else if (this.state.primaryText === "khasto") {
      this.setState({ primaryText: "dhaka" });
      this.setState({
        secondaryText:
          "Dhaka Originally called Thaka is a traditional hand made fabric of the indegenous Limbu people of eastern nepal",
      });
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
                : this.props.handleSexClick(2);
            }}
          >
            Shop
          </button>
        </div>
        <div className="headingText">
          <div>
            <img
              src="https://varana-files.s3.us-east-2.amazonaws.com/static_images/varana_logo_white.png"
              alt="Varana Logo"
              style={{ width: 160, height: 51 }}
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
