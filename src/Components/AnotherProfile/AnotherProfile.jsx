import React from "react";
import { defaultUser } from "../../assets/photos";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetOneUserApi, GetUserPosts } from "../../Redux/extraReducer";
import { useParams } from "react-router";

function AnotherProfile() {
  const { userPosts, oneUser } = useSelector((state) => state.Slice);
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    dispatch(GetOneUserApi(id));
    dispatch(GetUserPosts(id));
  }, [id]);
  console.log(oneUser);
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
              {userPosts?.length == 0 ? (
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
