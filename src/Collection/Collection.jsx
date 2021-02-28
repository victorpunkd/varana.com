import React, { Component } from "react";
import "./Collection.css";
import CollectionCard from "../CollectionCard/CollectionCard";
import Loader from "../Loader/Loader";
import { getApiEndpoint } from "../apiEndpoint";

export class Collection extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sex !== this.props.sex) {
      this.fetchData();
    }
  }

  handleCollectionClick = (collectionID, collectionName) => {
    this.props.collectionClicked(collectionID, collectionName);
  };

  fetchData = () => {
    this.setState({ isLoaded: false });
    fetch(`${getApiEndpoint()}/api/collection/${this.props.sex}`)
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            isLoaded: true,
            data: data
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  render() {
    const { data, isLoaded, error } = this.state;
    if (error) {
      return <div>Seomthing went wrong please refresh the page</div>;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      return (
        <div className="apparelTypes">
          <div
            className={`overlay w3-animate-opacity ${
              this.props.overlay ? "" : "w3-hide"
            }`}
          ></div>
          <div className="w3-row collectionCardsContainer">
            {data.map(collection => (
              <CollectionCard
                key={collection.collection_id}
                id={collection.collection_id}
                image={collection.collection_picture}
                name={collection.collection_name}
                collectionClicked={this.handleCollectionClick}
              />
            ))}
          </div>
        </div>
      );
    }
  }
}

export default Collection;
