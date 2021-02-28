import React, { Component } from "react";
import "./LoginSignup.css";
import { getApiEndpoint } from "../apiEndpoint";

export class LoginSignup extends Component {
  constructor() {
    super();
    this.state = {
      userData: [],
      emailPhone: "",
      isEmailPhoneValid: true,
      password: "",
      isPasswordValid: true,
      loggedInUser: "",
      isUserLogged: true
    };
    this.emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.phoneNoRegex = /^\d{10}$/;
  }

  handleInputChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleBlurEmailPhone = event => {
    this.setState({ emailPhone: this.state.emailPhone.trim() });
    if (this.state.emailPhone !== "") {
      if (
        !this.emailRegex.test(this.state.emailPhone) &&
        !this.phoneNoRegex.test(this.state.emailPhone)
      )
        this.setState({ isEmailPhoneValid: false });
      else this.setState({ isEmailPhoneValid: true });
      return;
    }
    this.setState({ isEmailPhoneValid: true });
  };

  handleLogInClick = () => {
    if (!this.state.isEmailPhoneValid) return;
    if (this.state.password === "") {
      this.setState({ isPasswordValid: false });
      return;
    }
    this.setState({ isPasswordValid: true });
    this.logInUser();
  };

  logInUser = () => {
    fetch(
      `${getApiEndpoint()}/api/getUserInformation/${this.state.emailPhone}/${
        this.state.password
      }`
    )
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            userData: data
          });
          this.setState({
            loggedInUser:
              this.state.userData.length > 0
                ? this.state.userData[0].phone_no
                : ""
          });
          if (this.state.loggedInUser !== "") {
            localStorage.setItem(
              "loggedInUserPhoneNo",
              this.state.userData[0].phone_no
            );
            this.setState({ isUserLogged: true });
            this.props.userLoggedIn();
          } else {
            this.setState({ isUserLogged: false });
          }
        },
        error => {
          this.setState({
            error
          });
        }
      );
  };

  render() {
    return (
      <div className="loginSignup">
        <div className="heading">I AM ALREADY A USER</div>
        <div className="textBoxDiv">
          <label
            className={`label ${
              this.state.emailPhone === "" ? "labelHide" : "w3-animate-bottom"
            }`}
          >
            E-mail / Phone No
          </label>
          <input
            name="emailPhone"
            placeholder="E-mail / Phone No"
            onChange={this.handleInputChanged}
            onBlur={this.handleBlurEmailPhone}
            value={this.state.emailPhone}
            className={`textBox ${
              this.state.isEmailPhoneValid ? "w3-border-black" : "w3-border-red"
            }`}
          />
          <label
            className={`w3-text-red w3-small ${
              this.state.isEmailPhoneValid ? "labelHide" : "w3-animate-bottom"
            }`}
          >
            <i className="fa fa-exclamation-triangle"></i> Invalid email id or
            phone no
          </label>
        </div>
        <div className="textBoxDiv">
          <label
            className={`label ${
              this.state.password === "" ? "labelHide" : "w3-animate-bottom"
            }`}
          >
            Password
          </label>
          <input
            name="password"
            placeholder="Password"
            onChange={this.handleInputChanged}
            onBlur={this.handleBlur}
            type="password"
            className="textBox"
          />
          <label
            className={`w3-text-red w3-small ${
              this.state.isPasswordValid ? "labelHide" : "w3-animate-bottom"
            }`}
          >
            <i className="fa fa-exclamation-triangle"></i> Password can't be
            blank
          </label>
        </div>
        <div style={{ marginTop: "5%" }}>
          <button
            className="w3-btn w3-black button"
            onClick={this.handleLogInClick}
          >
            LOG IN
          </button>

          <label
            className={`w3-text-red w3-small ${
              this.state.isUserLogged ? "labelHide" : "w3-animate-bottom"
            }`}
          >
            <i className="fa fa-exclamation-triangle"></i> Credentials not
            matching
          </label>
        </div>
        <div className="w3-center">
          <span onClick={this.props.forgetPasswordClicked}>
            Forgot your password?
          </span>
        </div>
        <div className="heading">NEW USER ?</div>
        <div>
          <button
            onClick={this.props.createAccoutClicked}
            className="w3-btn w3-black button"
          >
            CREATE ACCOUNT
          </button>
        </div>
      </div>
    );
  }
}

export default LoginSignup;
