import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginUser } from "../../Redux/extraReducer";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [theError, setTheError] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleValidate = () => {
    const { email, password } = data;
    if (email === "") {
      toast.error("Email and Password is required.");
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validate = handleValidate();
    if (validate) {
      dispatch(LoginUser(data)).then((data) => {
        if (!data.payload.status) {
          setTheError(data.payload.msg);
          return;
        }
        navigate("/");
      });
    }
  };

  return (
    <div className="register-page">
      <div className="page">
        <div className="header">
          <h1 className="logo">The Insta</h1>
          <p>Login to see photos and videos from your friends.</p>
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
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={(e) => handleChange(e)}
            />

            <button onClick={handleSubmit}>Login</button>
          </form>
          <ul>
            <li>By signing up, you agree to our</li>
            <li>
              <a>Terms</a>
            </li>
            <li>
              <a>Data Policy</a>
            </li>
            <li>and</li>
            <li>
              <a>Cookies Policy</a> .
            </li>
          </ul>
        </div>
      </div>
      <div className="option">
        <p>
          Don`t have an account?{" "}
          <NavLink to={"/register"} onClick={() => setTheError("")}>
            Sign up
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
            <a>ABOUT</a>
          </li>
          <li>
            <a>HELP</a>
          </li>
          <li>
            <a>PRESS</a>
          </li>
          <li>
            <a>API</a>
          </li>
          <li>
            <a>JOBS</a>
          </li>
          <li>
            <a>PRIVACY</a>
          </li>
          <li>
            <a>TEMS</a>
          </li>
          <li>
            <a>LOCATIONS</a>
          </li>
          <li>
            <a>TOP ACCOUNTS</a>
          </li>
          <li>
            <a>HASHTAGS</a>
          </li>
          <li>
            <a>LANGUAGE</a>
          </li>
        </ul>
        <p>© 2023 The Insta</p>
      </div>
    </div>
  );
}

export default Login;
