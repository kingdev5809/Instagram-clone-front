import { useState } from "react";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import NotFound from "./Components/NotFound/NotFound";
import { Route, Routes, useNavigate } from "react-router";
import "./App.scss";
import Sidebar from "./Components/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";

import CreatePost from "./Components/CreatePost/CreatePost";
import { useSelector } from "react-redux";
import AnotherProfile from "./Components/AnotherProfile/AnotherProfile";
function App() {
  const [visibleModel, setVisibleModel] = useState(false);
  const { appUser, load } = useSelector((state) => state.Slice);
  let userData;
  userData = JSON.parse(localStorage.getItem("userData"));
  const authRoute = [
    { id: 1, name: "Home", path: "/", element: <Home /> },
    { id: 2, name: "Profile", path: "/profile", element: <Profile /> },
    {
      id: 3,
      name: "Profile",
      path: "/profile/:id",
      element: <AnotherProfile />,
    },
  ];

  const nonAuthRoute = [
    { id: 1, name: "Login", path: "/", element: <Login /> },
    { id: 2, name: "Login", path: "/login", element: <Login /> },
    { id: 3, name: "Register", path: "/register", element: <Register /> },
  ];

  return (
    <div className="the-big-page">
      {userData ? (
        <div className="insta-clone">
          <div className="sidebar-side">
            <Sidebar setVisibleModel={setVisibleModel} />
          </div>
          <div className="main-side">
            <Routes>
              {/* {authRoute.map((link) => (
                <Route key={link.id} path={link.path} element={link.element} />
              ))} */}
              <Route path={"/"} element={<Home />} />
              <Route path={"/profile"} element={<Profile />} />
              <Route path={"/profile/:id"} element={<AnotherProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          {/*  <div className="loader"></div> */}
          {visibleModel ? <CreatePost setVisibleModel={setVisibleModel} /> : ""}
          <ToastContainer />
        </div>
      ) : (
        <div className="main-side">
          <Routes>
            {nonAuthRoute.map((link) => (
              <Route key={link.id} path={link.path} element={link.element} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
