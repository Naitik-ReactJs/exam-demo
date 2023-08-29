import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className=" container text-center">
      <div className="jumping-dots-loader">
        {" "}
        <span></span> <span></span> <span></span>{" "}
      </div>
      <div className="moving-gradient"></div>
    </div>
  );
};

export default Loader;

// https://codepen.io/Mohammed-Hamza_Pakistan/pen/WNYJPjv
// loader link
