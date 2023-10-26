import React from "react";
import PostItem from "./PostItem";
import "./Posts.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPosts } from "../../../Redux/extraReducer";
import Loader from "../../../Components/Loader/Loader";
function Posts() {
  const dispatch = useDispatch();
  const { posts, load } = useSelector((state) => state.Slice);
  useEffect(() => {
    dispatch(getAllPosts());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="posts">
      {!load ? (
        <>
          {posts
            .map((post) => <PostItem key={post._id} post={post} />)
            .reverse()}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Posts;
