import React, { useState } from "react";
import "./Auth.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../../Redux/extraReducer";
import { toast } from "react-toastify";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    fullName: "",
    email: "",
    password: "",
  });
  const [theError, setTheError] = useState("");
  const handleValidation = () => {
    const { password, email, fullName, name } = data;
    if (password.length < 3) {
      toast.error("Password should be equal or greater than 8 characters.");
      return false;
    } else if (email === "") {
      toast.error("Email is required.");
      return false;
    } else if (name === "") {
      toast.error("Username is required.");
      return false;
    } else if (fullName === "") {
      toast.error("Fullname is required.");
      return false;
    }
    return true;
  };
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    let validate = handleValidation();
    if (validate) {
      dispatch(RegisterUser(data)).then((data) => {
        if (data.payload.status) {
          navigate("/");
          return;
        }
        setTheError(data.payload.msg);
      });
    }
  };

  return (
    <div className="register-page">
      <div className="page">
        <div className="header">
          <h1 className="logo">The Insta</h1>
          <p>Sign up to see photos and videos from your friends.</p>
        </div>
        <div className="error">
          <h2>{theError}</h2>
        </div>
        <div className="container">
          <form>
            <input
              type="text"
              placeholder="Email"
              value={data.email}
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              placeholder="User Name"
              value={data.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              placeholder="Full Name"
              value={data.fullName}
              name="fullName"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={(e) => handleChange(e)}
            />
            <button onClick={handleRegister}>Sign up</button>
          </form>

          <ul>
            <li>By signing up, you agree to our</li>
            <li>
              <a href="">Terms</a>
            </li>
            <li>
              <a href="">Data Policy</a>
            </li>
            <li>and</li>
            <li>
              <a href="">Cookies Policy</a> .
            </li>
          </ul>
        </div>
      </div>
      <div className="option">
        <p>
          Have an account?{" "}
          <NavLink to={"/login"} onClick={() => setTheError("")}>
            Log in
          </NavLink>
        </p>
      </div>
      <div className="otherapps">
        <p>Get the app.</p>
        <button type="button">
          <i className="fab fa-apple"></i> App Store
        </button>
        <button type="button">
          <i className="fab fa-google-play"></i> Google Play
        </button>
      </div>
      <div className="footer">
        <ul>
          <li>
            <a href="">ABOUT</a>
          </li>
          <li>
            <a href="">HELP</a>
          </li>
          <li>
            <a href="">PRESS</a>
          </li>
          <li>
            <a href="">API</a>
          </li>
          <li>
            <a href="">JOBS</a>
          </li>
          <li>
            <a href="">PRIVACY</a>
          </li>
          <li>
            <a href="">TEMS</a>
          </li>
          <li>
            <a href="">LOCATIONS</a>
          </li>
          <li>
            <a href="">TOP ACCOUNTS</a>
          </li>
          <li>
            <a href="">HASHTAGS</a>
          </li>
          <li>
            <a href="">LANGUAGE</a>
          </li>
        </ul>
        <p>© 2023 The Insta</p>
      </div>
    </div>
  );
}

export default Register;
