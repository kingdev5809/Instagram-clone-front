import React, { useState } from "react";
import big_logo from "../../assets/photos/insta_logo.svg.png";
import small_logo from "../../assets/photos/87390.png";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.scss";

import {
  faHeart,
  faHome,
  faMessage,
  faPlusSquare,
  faSearch,
  faSignOut,
  faUser,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./Searchbar";
// eslint-disable-next-line react/prop-types
function Sidebar({ setVisibleModel }) {
  const [visibleSearchbar, setVisibleSearchbar] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const handleVisibleSearch = () => {
    setVisibleSearchbar(!visibleSearchbar);
  };
  return (
    <div
      className={`sidebar-component ${
        visibleSearchbar ? "searchbar-show" : ""
      }`}
    >
      <div className="sidebar-header">
        <img className="big-logo" src={big_logo} alt="" />
        <img className="small-logo" src={small_logo} alt="" />
      </div>
      <div className="links">
        <div className="link">
          <NavLink to="/">
            <FontAwesomeIcon icon={faHome} /> <span>Home</span>
          </NavLink>
        </div>

        <div className="link" onClick={handleVisibleSearch}>
          <NavLink>
            <FontAwesomeIcon icon={faSearch} /> <span>Search</span>
          </NavLink>
        </div>

        <div className="link">
          <NavLink>
            <FontAwesomeIcon icon={faVideo} /> <span>Explore</span>
          </NavLink>
        </div>

        <div className="link">
          <NavLink>
            <FontAwesomeIcon icon={faMessage} /> <span>Messages</span>
          </NavLink>
        </div>

        <div className="link">
          <NavLink>
            <FontAwesomeIcon icon={faHeart} /> <span>Notifications</span>
          </NavLink>
        </div>
        <div className="link" onClick={() => setVisibleModel(true)}>
          <NavLink>
            <FontAwesomeIcon icon={faPlusSquare} /> <span>Create</span>
          </NavLink>
        </div>

        <div className="link">
          <NavLink to="/profile">
            <FontAwesomeIcon icon={faUser} /> <span>Profile</span>
          </NavLink>
        </div>
      </div>
      <div className="sidebar-footer" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOut} />
        <span> Log out</span>
      </div>
      <SearchBar
        searchBar={visibleSearchbar}
        setSearchBar={setVisibleSearchbar}
      />
    </div>
  );
}

export default Sidebar;
