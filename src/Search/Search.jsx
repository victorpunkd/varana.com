import React, { Component } from "react";
import "./Search.css";

export class Search extends Component {
  render() {
    return (
      <div className="search" style={{ color: this.props.color }}>
        <div className="primaryTextFont searchText">
          SEARCH
          <span>
            <input
              className="input"
              type="text"
              style={{ color: this.props.color }}
            />
          </span>
        </div>
      </div>
    );
  }
}

export default Search;
