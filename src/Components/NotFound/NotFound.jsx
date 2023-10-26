import React from "react";
import "./NotFound.scss";
import { NavLink } from "react-router-dom";
function NotFound() {
  return (
    <div className="not-found-page">
      <div className="flex-container">
        <div className="text-center">
          <h1>
            <span className="fade-in" id="digit1">
              4
            </span>
            <span className="fade-in" id="digit2">
              0
            </span>
            <span className="fade-in" id="digit3">
              4
            </span>
          </h1>
          <h3 className="fadeIn">PAGE NOT FOUND</h3>
          <NavLink to={"/"}>
            <button type="button" name="button">
              Return To Home
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
