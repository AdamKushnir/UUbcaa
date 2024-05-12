import React from "react";

function BluePage() {
  return (
    <div style={bluePageStyle()}>
      <h1>Blue Page</h1>
    </div>
  );
}

function bluePageStyle() {
  return {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#187bcd",
    color: "#fff",
  };
}

export default BluePage;
