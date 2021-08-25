import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 480, clear: "both", paddingTop: 25, textAlign: "center" }}
    >
      {children}
    </div>
  );
}

export default Jumbotron;
