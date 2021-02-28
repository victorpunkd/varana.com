import React, { Component } from "react";
import "./AccountManagement.css";
import TextBoxContainer from "../TextBoxContainer/TextBoxContainer";
import Loader from "../Loader/Loader";
import { getApiEndpoint } from "../apiEndpoint";

export class AccountManagement extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoaded: false,
      phone_no: "",
      email_id: "",
      name: "",
      password: ""
    };
    this.emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.phoneNoRegex = /^\d{10}$/;
    this.nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  }

  handleOnBlur = (name, text) => {
    this.setState({ [name]: text });
  };

  componentDidMount() {
    fetch(
      `${getApiEndpoint()}/api/getLogedInUserInformation/${localStorage.getItem(
        "loggedInUserPhoneNo"
      )}`
    )
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            isLoaded: true,
            data: data,
            phone_no: data[0].phone_no,
            email_id: data[0].email_id,
            name: data[0].name,
            password: data[0].password
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleUpdateProfileClick = () => {
    if (this.state.name && this.state.password) {
      this.updateProfileInfo();
    }
  };

  updateProfileInfo = () => {
    fetch(
      `${getApiEndpoint()}/api/updateUserInformation/${this.state.phone_no}/${
        this.state.email_id
      }/${this.state.name}/${this.state.password}`
    )
      .then(res => res.json())
      .then(
        data => {
          console.log(data);
          if (data[0].code === 100) alert("Data Updated Successfully");
        },
        error => {
          this.setState({
            error
          });
        }
      );
  };

  render() {
    const { data, isLoaded, error } = this.state;
    if (error) {
      return (
        <div>
          Seomthing went wrong please refresh the page{console.log(error)}
        </div>
      );
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      return (
        <div className="acountManagement">
          <div className="secondaryTextFont w3-large">Your Profile</div>
          <div>
            <TextBoxContainer
              label="Phone No"
              name="phone"
              value={data[0].phone_no}
              disabled={true}
              onBlur={this.handleOnBlur}
              regex={this.phoneNoRegex}
              type="text"
            />
            <TextBoxContainer
              label="Email Id"
              name="email"
              value={data[0].email_id}
              disabled={true}
              onBlur={this.handleOnBlur}
              regex={this.emailRegex}
              type="text"
            />
            <TextBoxContainer
              label="Name"
              name="name"
              value={data[0].name}
              onBlur={this.handleOnBlur}
              regex={this.nameRegex}
              type="text"
            />
            <TextBoxContainer
              label="Password"
              name="password"
              value={data[0].password}
              onBlur={this.handleOnBlur}
              regex=""
              type="password"
            />
          </div>
          <button
            onClick={this.handleUpdateProfileClick}
            className="w3-btn w3-black button"
          >
            UPDATE INFORMATION
          </button>
        </div>
      );
    }
  }
}

export default AccountManagement;
