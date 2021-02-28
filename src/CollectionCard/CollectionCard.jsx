import React, { Component } from "react";
import "./CollectionCard.css";

export class CollectionCard extends Component {
  render() {
    return (
      <div
        onClick={() =>
          this.props.collectionClicked(this.props.id, this.props.name)
        }
        className="collectionCard w3-animate-bottom"
      >
        <div
          className="w3-col s6 apparelTypeContainer"
          onClick={this.props.gamchaCollectionClicked}
        >
          <div
            className="collectionBackground w3-display-container"
            style={{ backgroundImage: `url(${this.props.image})` }}
          >
            <div className="w3-display-middle">{this.props.name}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionCard;
