import React from "react";
import Story from "./Story/Story";
import "./Home.scss";
import RecomendUsers from "./RecomentUsers/RecomendUsers";
import Posts from "./Posts/Posts";
function Home() {
  return (
    <div className="home-page">
      <div className="left">
        <div className="story-side">
          <Story />
          <Posts />
        </div>
      </div>
      <div className="righ">
        <div className="recomend-users">
          <RecomendUsers />
        </div>
      </div>
    </div>
  );
}

export default Home;
