import React, { useState } from "react";
import { defaultUser } from "../../assets/photos";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  FollowUserApi,
  GetOneUserApi,
  GetUserPosts,
} from "../../Redux/extraReducer";
import { useParams } from "react-router";

function AnotherProfile() {
  const { userPosts, oneUser } = useSelector((state) => state.Slice);
  const [followedUsers, setFollowingUsers] = useState([]);

  let follow;
  follow = JSON.parse(localStorage.getItem("follow"));
  let userData;
  userData = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    dispatch(GetOneUserApi(id));
    dispatch(GetUserPosts(id));
  }, [dispatch, id]);

  const followHandle = async (user) => {
    console.log(user);
    if (followedUsers?.includes(user._id)) {
      const filter = followedUsers?.filter((item) => item !== user._id);
      setFollowingUsers(filter);
      localStorage.setItem("follow", JSON.stringify(filter));
      dispatch(FollowUserApi((userData._id, filter)));
      return;
    }
    if (!follow) {
      setFollowingUsers([user?._id]);
      dispatch(
        FollowUserApi({ id: userData._id, followingUsers: [user?._id] })
      );

      localStorage.setItem("follow", JSON.stringify([user?._id]));
    } else {
      setFollowingUsers([...follow, user?._id]);
      dispatch(
        FollowUserApi({
          id: userData._id,
          followingUsers: [...followedUsers, user?._id],
        })
      );
      localStorage.setItem(
        "follow",
        JSON.stringify([...followedUsers, user?._id])
      );
    }
  };
  return (
    <div>
      <div className="profile-page">
        <header>
          <div className="container">
            <div className="profile">
              <div className="profile-image">
                <img src={defaultUser} alt="" />
              </div>

              <div className="profile-user-settings">
                <h1 className="profile-user-name">{oneUser?.name}</h1>
                <button
                  className="btn profile-edit-btn follow"
                  onClick={() => followHandle(oneUser)}
                  // onClick={handleShowEditModal}
                >
                  {follow.includes(oneUser._id) ? "Followed" : "Follow"}
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
                    <span className="profile-stat-count">
                      {userPosts.length}
                    </span>{" "}
                    posts
                  </li>
                  <li>
                    <span className="profile-stat-count">0</span> followers
                  </li>
                  <li>
                    <span className="profile-stat-count">
                      {oneUser?.folowingUsers?.length}
                    </span>{" "}
                    following
                  </li>
                </ul>
              </div>

              <div className="profile-bio">
                <p>
                  <span className="profile-real-name">{oneUser?.fullName}</span>
                </p>
              </div>
            </div>
          </div>
        </header>

        <main>
          <div className="container">
            <div className="gallery">
              {userPosts?.length === 0 ? (
                <div>
                  <h1>This user have not any posts</h1>
                </div>
              ) : (
                ""
              )}
              {userPosts?.map((post) => (
                <div className="gallery-item" tabIndex="0">
                  <img src={post.image} className="gallery-image" alt="" />

                  <div className="gallery-item-info">
                    <p>{post.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AnotherProfile;
