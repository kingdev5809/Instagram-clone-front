import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { defaultUser } from "../../assets/photos";
import { useDispatch, useSelector } from "react-redux";
import { DeletePost, GetUserPosts } from "../../Redux/extraReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-confirm-alert/src/react-confirm-alert.css";

import ConfirmAlert, { confirmAlert } from "react-confirm-alert";
import { faClose, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditModal from "./EditModal";
function Profile() {
  const dispatch = useDispatch();
  const [editedData, setEditedData] = useState({});
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const { userPosts } = useSelector((state) => state.Slice);
  let userData;
  userData = JSON.parse(localStorage.getItem("userData"));
  let follow = JSON.parse(localStorage.getItem("follow"));

  useEffect(() => {
    dispatch(GetUserPosts(userData._id));
  }, []);

  const handleDeletePost = (id) => {
    dispatch(DeletePost(id));
    window.location.reload();
  };

  const handleClickConfirm = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",

      buttons: [
        {
          label: "Yes",
          onClick: () => handleDeletePost(id),
        },
        {
          label: "No",
          onClick: () => console.log("Click No"),
        },
      ],
    });
  };

  const handleShowEditModal = () => {
    let newData = {
      name: userData.name,
      fullName: userData.fullName,
      id: userData._id,
    };
    setEditedData(newData);
    setVisibleEditModal(true);
  };

  return (
    <div className="profile-page">
      <header>
        <div className="container">
          <div className="profile">
            <div className="profile-image">
              <img src={defaultUser} alt="" />
            </div>

            <div className="profile-user-settings">
              <h1 className="profile-user-name">{userData.name}</h1>

              <button
                className="btn profile-edit-btn"
                onClick={handleShowEditModal}
              >
                Edit Profile
              </button>

              <button
                className="btn profile-settings-btn"
                aria-label="profile settings"
              >
                <i className="fas fa-cog" aria-hidden="true"></i>
              </button>
            </div>

            <div className="profile-stats">
              <ul>
                <li>
                  <span className="profile-stat-count">{userPosts.length}</span>{" "}
                  posts
                </li>
                <li>
                  <span className="profile-stat-count">0</span> followers
                </li>
                <li>
                  <span className="profile-stat-count">{follow?.length}</span>{" "}
                  following
                </li>
              </ul>
            </div>

            <div className="profile-bio">
              <p>
                <span className="profile-real-name">{userData.fullName}</span> Lorem ipsum
                dolor sit, amet consectetur adipisicing elit 📷✈️🏕️
              </p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="gallery">
            {userPosts?.map((post) => (
              <div className="gallery-item" tabIndex="0">
                <img src={post.image} className="gallery-image" alt="" />

                <div className="gallery-item-info">
                  <div className="icons">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleClickConfirm(post._id)}
                    />
                  </div>
                  <p>{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {visibleEditModal ? (
        <EditModal
          editedData={editedData}
          setVisibleEditModal={setVisibleEditModal}
          setEditedData={setEditedData}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Profile;
