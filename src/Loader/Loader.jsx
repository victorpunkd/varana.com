import React from "react";

function Loader() {
  return (
    <div className="w3-text-gray w3-xlarge" style={{ width: "100vw" }}>
      <i className="fa fa-spinner fa-pulse w3-middle"></i> Loading
    </div>
  );
}

export default Loader;
