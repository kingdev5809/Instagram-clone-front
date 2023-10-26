import React, { useEffect, useState } from "react";
import "./RecomendUsers.scss";
import { defaultUser } from "../../../assets/photos";
import { useDispatch, useSelector } from "react-redux";
import { FollowUserApi } from "../../../Redux/extraReducer";
function RecomendUsers() {
  const dispatch = useDispatch();
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      fullName: "John David Doe",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      fullName: "Jane Elizabeth Doe",
    },
    {
      id: 3,
      name: "Peter Smith",
      email: "peter.smith@example.com",
      fullName: "Peter William Smith",
    },
    {
      id: 4,
      name: "Susan Jones",
      email: "susan.jones@example.com",
      fullName: "Susan Mary Jones",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@example.com",
      fullName: "David Michael Brown",
    },
    {
      id: 6,
      name: "Elizabeth Green",
      email: "elizabeth.green@example.com",
      fullName: "Elizabeth Ann Green",
    },
    {
      id: 7,
      name: "Michael Williams",
      email: "michael.williams@example.com",
      fullName: "Michael John Williams",
    },
    {
      id: 8,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      fullName: "Sarah Catherine Johnson",
    },
    {
      id: 9,
      name: "William Turner",
      email: "william.turner@example.com",
      fullName: "William James Turner",
    },
    {
      id: 10,
      name: "Mary Wilson",
      email: "mary.wilson@example.com",
      fullName: "Mary Margaret Wilson",
    },
  ];
  const follow = JSON.parse(localStorage.getItem("follow"));
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [notFollowedUsers, setNotFollowedUsers] = useState([]);
  const [followedUsers, setFollowingUsers] = useState([]);
  const { allUsers } = useSelector((state) => state.Slice);

  useEffect(() => {
    setFollowingUsers(follow);
  }, []);

  useEffect(() => {
    if (!follow) {
      localStorage.setItem("follow", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    const filteredUsers = [];

    for (const user of allUsers) {
      if (!follow.includes(user._id) && userData._id != user._id) {
        filteredUsers.push(user);
      }
    }
    setNotFollowedUsers(filteredUsers);
  }, [allUsers]);

  const followHandle = async (user) => {
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
    <section className="side-menu">
      <div className="menu__side__user-profile">
        <a href="#" className="menu__side__user-avatar">
          <img src={defaultUser} alt="User Picture" />
        </a>
        <div className="menu__side__user-info">
          <a target="_blank" rel="noreferrer">
            {userData?.name}
          </a>
          <span>{userData?.displayName}</span>
        </div>
        <button className="menu__side__user-button">Switch</button>
      </div>

      <div className="menu__side__suggestions-section">
        <div className="menu__side__suggestions-header">
          <h2>Suggestions for You</h2>
          <button>See All</button>
        </div>
        <div className="menu__side__suggestions-content">
          {notFollowedUsers.length == 0 ? (
            <h2>You have not recomended users</h2>
          ) : (
            ""
          )}
          {notFollowedUsers?.slice(0, 6)?.map((user) => (
            // eslint-disable-next-line react/jsx-key
            <div className="menu__side__suggestion">
              <a href="#" className="menu__side__suggestion-avatar">
                <img src={defaultUser} alt="User Picture" />
              </a>
              <div className="menu__side__suggestion-info">
                <a href="#">{user.name}</a>
                <span>Followed by user1 and 6 others</span>
              </div>
              <button
                className="side-menu-suggestionbtn"
                onClick={() => followHandle(user)}
              >
                {followedUsers?.includes(user?._id) ? "Followed" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="menu__side__footer">
        <div className="menu__side__footer-links">
          <ul className="menu__side__footer-list">
            <li className="menu__side__footer-item">
              <a className="menu__side__footer-link" href="#">
                About
              </a>
            </li>
            <li className="menu__side__footer-item">
              <a className="menu__side__footer-link" href="#">
                Help
              </a>
            </li>
            <li className="menu__side__footer-item">
              <a className="menu__side__footer-link" href="#">
                Press
              </a>
            </li>
            <li className="menu__side__footer-item">
              <a className="menu__side__footer-link" href="#">
                API
              </a>
            </li>
            <li className="menu__side__footer-item">
              <a className="menu__side__footer-link" href="#">
                Jobs
              </a>
            </li>
            <li className="menu__side__footer-item">
              <a className="menu__side__footer-link" href="#">
                Privacy
              </a>
            </li>
            <li className="menu__side__footer-item">
              <a className="menu__side__footer-link" href="#">
                Terms
              </a>
            </li>
            <li className="menu__side__footer-item">
              <a className="menu__side__footer-link" href="#">
                Locations
              </a>
            </li>
            <li className="menu__side__footer-item">
              <a className="menu__side__footer-link" href="#">
                Top Accounts
              </a>
            </li>
            <li className="menu__side__footer-item">
              <a className="menu__side__footer-link" href="#">
                Hashtag
              </a>
            </li>
            <li className="menu__side__footer-item">
              <a className="menu__side__footer-link" href="#">
                Language
              </a>
            </li>
          </ul>
        </div>

        <span className="menu__side__footer-copyright">
          &copy; 2021 insta from facebook
        </span>
      </div>
    </section>
  );
}

export default RecomendUsers;
