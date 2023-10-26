import React, { useEffect, useState } from "react";
import "./Comments.scss";
import { defaultUser } from "../../assets/photos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { SlackSelector } from "@charkour/react-reactions";
import { useDispatch, useSelector } from "react-redux";
import { AllComments, CreateComment } from "../../Redux/extraReducer";
import Loader from "../Loader/Loader";
function Comments({ post, setVisibleCommentModal }) {
  const dispatch = useDispatch();
  const [visibleReactions, setVisibleReactions] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [commentState, setCommentState] = useState([]);
  const { Comments, commentLoader } = useSelector((state) => state.Slice);
  const theUser = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    dispatch(AllComments(post._id));
  }, [post]);

  useEffect(() => {
    setCommentState(Comments);
  }, [Comments]);

  const handleAddReaction = (reaction) => {
    if (inputValue) {
      let newValue = inputValue + reaction;
      setInputValue(newValue);
    } else {
      setInputValue(reaction);
    }
  };

  const handleCreateComment = () => {
    let data = {
      user: theUser,
      text: inputValue,
      postId: post._id,
    };
    dispatch(CreateComment(data));
    setInputValue("");
    if (commentState) {
      setCommentState((prev) => [...prev, data]);
      return;
    }
    setCommentState(data);
  };

  return (
    <div>
      <div className="comment-modal">
        <div className="modal-content">
          <div className="modal-header">
            <span
              className="close-button"
              onClick={() => setVisibleCommentModal(false)}
            >
              ×
            </span>
            <h2 className="modal-title">Post</h2>
          </div>
          <div className="modal-body">
            <div className="post-image">
              <img
                src={post.image}
                alt="Post image"
              />
              <p>This is the post content.</p>
            </div>
            <div className="post-comment">
              <div className="comment-box">
                {commentLoader ? <Loader /> : ""}
                {commentState
                  ?.map((comment) => (
                    <div className="comment-item">
                      <img src={defaultUser} alt="" />
                      <p className="comment">
                        <span className="user-name">{comment.user.name}</span>
                        {comment.text}
                      </p>
                    </div>
                  ))
                  .reverse()}
              </div>
              <div className="comment-input">
                <div className="emoji">
                  {visibleReactions ? (
                    <div className="reactions">
                      <span
                        className="close"
                        onClick={() => setVisibleReactions(!visibleReactions)}
                      >
                        <FontAwesomeIcon icon={faClose} />
                      </span>
                      <SlackSelector onSelect={(e) => handleAddReaction(e)} />
                    </div>
                  ) : (
                    ""
                  )}
                  <span onClick={() => setVisibleReactions(!visibleReactions)}>
                    <svg
                      aria-label="Emoji"
                      className="x1lliihq x1n2onr6 x1roi4f4"
                      fill="currentColor"
                      height="15"
                      role="img"
                      viewBox="0 0 24 24"
                      width="15"
                    >
                      <title>Emoji</title>
                      <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
                    </svg>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Add some comment"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onClick={() => setVisibleReactions(false)}
                />
                <button onClick={handleCreateComment}>Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
