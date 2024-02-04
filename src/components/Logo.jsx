import React from "react";
import image from "../../public/vite.svg";
function Logo({ width = "100%" }) {
  return <img src={image} alt="Logo" style={{ width }} />;
}

export default Logo;
