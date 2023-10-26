import React, { useEffect, useState } from "react";
import "./Searchbar.scss";
import { defaultUser } from "../../assets/photos";
import { useDispatch, useSelector } from "react-redux";
import { FollowUserApi, GetAllUsersApi } from "../../Redux/extraReducer";
import { NavLink } from "react-router-dom";
function SearchBar({ searchBar, setSearchBar }) {
  const [followedUsers, setFollowingUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.Slice);
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
  const userData = JSON.parse(localStorage.getItem("userData"));
  let filteredUsers;
  filteredUsers = allUsers?.filter((user) => {
    return user.name?.toLowerCase().includes(searchTerm?.toLowerCase());
  });
  if (!searchTerm) {
    filteredUsers = [];
  }
  const follow = JSON.parse(localStorage.getItem("follow"));
  useEffect(() => {
    setFollowingUsers(follow);
    dispatch(GetAllUsersApi());
  }, []);

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
    <div className={searchBar ? "active" : ""}>
      <div className="Search_Bar">
        <h1>Search</h1>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <div className="mans">
          {/* <h3>{!filteredUsers ? "" : "Type Users username"}</h3> */}
          <div className="menu__side__suggestions-content">
            {filteredUsers?.map((user) => (
              <div className="menu__side__suggestion" key={user._id}>
                <a href="#" className="menu__side__suggestion-avatar">
                  <img src={defaultUser} alt="User Picture" />
                </a>
                <div className="menu__side__suggestion-info">
                  <NavLink to={`/profile/${user._id}`}>{user.name}</NavLink>

                  <span>Followed by user1 and 6 others</span>
                </div>
                <button
                  className="side-menu-suggestionbtn"
                  onClick={() => followHandle(user)}
                >
                  {followedUsers?.includes(user._id) ? "Followed" : "Follow"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div onClick={() => setSearchBar(false)} className="black-screen"></div>
    </div>
  );
}

export default SearchBar;
