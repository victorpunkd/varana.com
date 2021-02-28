import React, { Component } from "react";
import "./CreateAccount.css";
import TextBoxContainer from "../TextBoxContainer/TextBoxContainer";
import { getApiEndpoint } from "../apiEndpoint";

export class CreateAccount extends Component {
  constructor() {
    super();
    this.state = {
      phone: "",
      email: "",
      name: "",
      password: "",
      gender: ""
    };
    this.emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.phoneNoRegex = /^\d{10}$/;
    this.nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  }

  handleOnBlur = (name, text) => {
    this.setState({ [name]: text });
  };

  handleCreateAccountClick = () => {
    if (
      this.state.phone &&
      this.state.email &&
      this.state.name &&
      this.state.password
    ) {
      this.createUserProfile();
      //localStorage.setItem("loggedInUserPhoneNo", this.state.phone);
      //this.props.createAccountDone();
    }
  };

  createUserProfile() {
    fetch(
      `${getApiEndpoint()}/api/createUser/${this.state.phone}/${
        this.state.email
      }/${this.state.name}/${this.state.password}`
    )
      .then(res => res.json())
      .then(
        data => {
          console.log(data[0].code);
          if (data[0].code === 201) {
            alert(
              `${data[0].phone_no ? "Phone no already exist" : ""}
              ${data[0].email_id ? " Email id already exist" : ""}`
            );
          } else {
            localStorage.setItem("loggedInUserPhoneNo", this.state.phone);
            alert("Account creation successfull");
            this.props.createAccountDone();
          }
        },
        error => {
          this.setState({
            error
          });
        }
      );
  }

  render() {
    return (
      <div className="createAccount">
        <div className="heading">CREATE YOUR ACCOUNT</div>
        <TextBoxContainer
          label="Phone No"
          name="phone"
          value=""
          onBlur={this.handleOnBlur}
          regex={this.phoneNoRegex}
          type="text"
        />

        <TextBoxContainer
          label="Email Id"
          name="email"
          value=""
          onBlur={this.handleOnBlur}
          regex={this.emailRegex}
          type="text"
        />

        <TextBoxContainer
          label="Name"
          name="name"
          value=""
          onBlur={this.handleOnBlur}
          regex={this.nameRegex}
          type="text"
        />

        <TextBoxContainer
          label="Password"
          name="password"
          value=""
          onBlur={this.handleOnBlur}
          regex=""
          type="password"
        />

        <div>
          <button
            onClick={this.handleCreateAccountClick}
            className="w3-btn w3-black button"
          >
            Create Account
          </button>
        </div>
      </div>
    );
  }
}

export default CreateAccount;
