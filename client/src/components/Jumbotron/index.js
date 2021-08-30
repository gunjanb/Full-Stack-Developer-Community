import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: "100vh", clear: "both", paddingTop: 25, textAlign: "center", backgroundImage: "linear-gradient(to top, #00b3b3, #6699ff)", fontFamily: "Share Tech, sans-serif", fontSize: "3rem", color: "white" }}
    >
      {children}
    </div>
  );
}

export default Jumbotron;
