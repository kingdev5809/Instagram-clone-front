import React from "react";
import { NavLink } from "react-router-dom";
import "./Auth.scss";
function Auth() {
  return (
    <div className="auth-page">
      <h1>This is not offical instagram</h1>
      <h2>This instagram for Astrum academy</h2>
      <h2>Created by Student</h2>
      <h2>You can register and login your accaunt</h2>
      <div className="buttons">
        <NavLink to={`/login`}>Login</NavLink>
        <NavLink to={`/register`}>Register</NavLink>
      </div>
    </div>
  );
}

export default Auth;
