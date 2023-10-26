import React from "react";
import "./Story.scss";
import { defaultUser } from "../../../assets/photos";
function Story() {
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
  return (
    <div>
      <div className="box__story">
        <div className="stories__content">
          {users?.map((user) => (
            <div key={user.id}>
              <button className="story story--has-story">
                <div className="boxStory__avatar">
                  <div className="boxStory__border">
                    <svg
                      width="64"
                      height="64"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle r="31" cy="32" cx="32" />

                      <defs>
                        <linearGradient
                          y2="0"
                          x2="1"
                          y1="1"
                          x1="0"
                          id="--story-gradient"
                        >
                          <stop offset="0" stopColor="#f09433" />
                          <stop offset="0.25" stopColor="#e6683c" />
                          <stop offset="0.5" stopColor="#dc2743" />
                          <stop offset="0.75" stopColor="#cc2366" />
                          <stop offset="1" stopColor="#bc1888" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div className="boxStory__picture">
                    <img src={defaultUser} alt="User Picture" />
                  </div>
                </div>
                <span className="boxStory__user">{user?.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Story;
