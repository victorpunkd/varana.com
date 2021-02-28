import React, { Component } from "react";
import "./TextBoxContainer.css";
export class TextBoxContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.value,
      error: false
    };
    this.regex = new RegExp(props.regex);
  }

  handleInputChanged = event => {
    this.setState({ text: event.target.value });
  };

  handleOnBlur = () => {
    this.setState({ text: this.state.text.trim() });
    if (this.state.text.trim() !== "") {
      if (!this.regex.test(this.state.text)) {
        this.props.onBlur(this.props.name, "");
        this.setState({ error: true });
      } else {
        this.props.onBlur(this.props.name, this.state.text);
        this.setState({ error: false });
      }
    } else {
      this.props.onBlur(this.props.name, this.state.text.trim());
    }
  };

  render() {
    return (
      <div className="textBoxDiv">
        <label
          className={`label ${
            this.state.text === "" ? "labelHide" : "w3-animate-bottom"
          }`}
        >
          {this.props.label}
        </label>
        <input
          name={this.props.name}
          placeholder={this.props.label}
          onChange={this.handleInputChanged}
          onBlur={this.handleOnBlur}
          value={this.state.text}
          type={this.props.type}
          disabled={this.props.disabled}
          className={`textBox ${
            this.state.error ? "w3-border-red" : "w3-border-black"
          }`}
        />
        <label
          className={`w3-text-red w3-small ${
            this.state.error ? "w3-animate-bottom" : "labelHide"
          }`}
        >
          <i className="fa fa-exclamation-triangle"></i> Invalid{" "}
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default TextBoxContainer;
