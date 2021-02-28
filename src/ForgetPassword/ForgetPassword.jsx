import React, { Component } from "react";
import "./ForgetPassword.css";
import { getApiEndpoint } from "../apiEndpoint";

export class ForgetPassword extends Component {
  constructor() {
    super();
    this.countDownTime = 5;
    this.state = {
      phone: "",
      isPhoneValid: true,
      OTP: "",
      isOTPValid: true,
      isOTPSent: false,
      isButtonDisable: false,
      countDown: this.countDownTime,
      data: []
    };
    this.phoneNoRegex = /^\d{10}$/;
  }

  handleInputChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleBlurPhone = () => {
    this.setState({ phone: this.state.phone.trim() });
    if (this.state.phone !== "") {
      if (!this.phoneNoRegex.test(this.state.phone))
        this.setState({ isPhoneValid: false });
      else this.setState({ isPhoneValid: true });
      return;
    }
    this.setState({ isPhoneValid: true });
  };

  handleSendOTPClick = () => {
    if (!this.state.isPhoneValid) return;
    if (this.state.phone === "") {
      this.setState({ isPhoneValid: false });
      return;
    }
    this.setState({
      isPhoneValid: true,
      isOTPSent: true,
      isButtonDisable: true
    });
    let interval = setInterval(() => {
      this.setState({ countDown: this.state.countDown - 1 });
    }, 1000);
    setTimeout(() => {
      this.setState(
        { isButtonDisable: false, countDown: this.countDownTime },
        () => {
          clearTimeout(interval);
        }
      );
    }, this.countDownTime * 1000);

    this.sendOTP();
  };

  sendOTP = () => {
    fetch(`${getApiEndpoint()}/api/sendOTP/${this.state.phone}`)
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            data: data,
            isOTPSent: true
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );
  };

  handleSignInClick = () => {
    this.setState({ OTP: this.state.OTP.trim() }, () => {
      if (this.state.OTP !== "") {
        this.checkOTP();
      } else this.setState({ isOTPValid: false });
    });
  };

  checkOTP = () => {
    fetch(
      `${getApiEndpoint()}/api/checkOTP/${this.state.phone}/${this.state.OTP}`
    )
      .then(res => res.json())
      .then(
        data => {
          this.setState(
            {
              isOTPValid: data[0].code === 1 ? true : false
            },
            () => {
              if (this.state.isOTPValid) {
                this.isUserExist();
              }
            }
          );
        },
        error => {
          this.setState({
            error
          });
        }
      );
  };

  isUserExist = () => {
    fetch(
      `${getApiEndpoint()}/api/getLogedInUserInformation/${this.state.phone}`
    )
      .then(res => res.json())
      .then(
        data => {
          if (data.length > 0)
            this.props.handleIsUserExist(this.state.phone, true);
          else this.props.handleIsUserExist(this.state.phone, false);
        },
        error => {
          this.setState({
            error
          });
        }
      );
  };

  render() {
    if (this.state.error) {
      return <div>Seomthing went wrong please refresh the page</div>;
    }
    return (
      <div className="forgetPasswordMainDiv">
        <div className="heading">Forgot your password?</div>
        <div className="textBoxDiv">
          <label
            className={`label ${
              this.state.phone === "" ? "labelHide" : "w3-animate-bottom"
            }`}
          >
            Phone No
          </label>
          <input
            readOnly={this.state.isOTPSent}
            name="phone"
            placeholder="Phone No"
            onChange={this.handleInputChanged}
            onBlur={this.handleBlurPhone}
            value={this.state.phone}
            className={`textBox ${
              this.state.isPhoneValid ? "w3-border-black" : "w3-border-red"
            }`}
          />
          <label
            className={`w3-text-red w3-small ${
              this.state.isPhoneValid ? "labelHide" : "w3-animate-bottom"
            }`}
          >
            <i className="fa fa-exclamation-triangle"></i> Invalid Phone no
          </label>
        </div>
        {this.state.isOTPSent && (
          <div>
            <div className="textBoxDiv">
              <label
                className={`label ${
                  this.state.OTP === "" ? "labelHide" : "w3-animate-bottom"
                }`}
              >
                OTP
              </label>
              <input
                name="OTP"
                placeholder="OTP"
                onChange={this.handleInputChanged}
                value={this.state.OTP}
                className={`textBox ${
                  this.state.isOTPValid ? "w3-border-black" : "w3-border-red"
                }`}
              />
              <label
                className={`w3-text-red w3-small ${
                  this.state.isOTPValid ? "labelHide" : "w3-animate-bottom"
                }`}
              >
                <i className="fa fa-exclamation-triangle"></i> Invalid OTP
              </label>
            </div>
            <div style={{ marginTop: "5%" }}>
              <button
                className="w3-btn button w3-black"
                onClick={this.handleSignInClick}
              >
                Sign In
              </button>
            </div>
          </div>
        )}
        <div style={{ marginTop: "5%" }}>
          <button
            disabled={this.state.isButtonDisable}
            onClick={this.handleSendOTPClick}
            className="w3-btn w3-black button"
          >
            {this.state.countDown < this.countDownTime
              ? `Send again in ${this.state.countDown}`
              : "Send OTP"}
          </button>
        </div>
      </div>
    );
  }
}

export default ForgetPassword;
