/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import "./CreatePost.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { storage } from "../Firebase/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CreateNewPost } from "../../Redux/extraReducer";
import { useDispatch } from "react-redux";
function CreatePost({ setVisibleModel }) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [imageUpload, setImageUpload] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [text, setText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [optionProgres, setOptionProgres] = useState("first");
  const handleCloseModal = () => {
    setVisibleModel(false);
    setOptionProgres("first");
    setImageUpload("");
  };
  const handleUploadImage = () => {
    const imageRef = ref(storage, `images/${imageUpload?.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setPhotoUrl(url);
        setImageUpload(null);
        setLoading(false);
        setOptionProgres("second");
      });
    });
  };

  const user = JSON.parse(localStorage.getItem("userData"));
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photoUrl) {
      return;
    }
    const thisData = {
      image: photoUrl,
      user: user._id,
      content: text,
    };
    if (!text) {
      toast.error("Please enter some  content");
      return;
    }
    await dispatch(CreateNewPost(thisData));
    window.location.reload();
  };

  useEffect(() => {
    if (imageUpload) {
      setLoading(true);
      handleUploadImage();
    }
  }, [imageUpload]);
  const handleOpenFileInput = () => {
    inputRef.current.click();
  };
  return (
    <div className="create-post">
      <div className="create-post-inner">
        <div className="close-modal">
          <FontAwesomeIcon icon={faClose} onClick={handleCloseModal} />
        </div>
        {loading ? <h1>Uploading..</h1> : ""}
        {optionProgres == "first" && !loading ? (
          <div className="first-option">
            <div className="header">
              <h2>Create new post</h2>
            </div>
            <div className="main">
              <svg
                aria-label="Icon to represent media such as images or videos"
                fill="currentColor"
                height="77"
                role="img"
                viewBox="0 0 97.6 77.3"
                width="96"
              >
                <title>Icon to represent media such as images or videos</title>
                <path
                  d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                  fill="currentColor"
                ></path>
                <path
                  d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                  fill="currentColor"
                ></path>
                <path
                  d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                  fill="currentColor"
                ></path>
              </svg>
              <h1>Upload photo </h1>
              <button onClick={handleOpenFileInput}>
                Select from computer
              </button>
              <input
                ref={inputRef}
                type="file"
                onChange={(e) => setImageUpload(e.target.files[0])}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {optionProgres == "second" ? (
          <div className="second-option">
            <img src={photoUrl} alt="" />
            <div className="inner">
              <input
                type="text"
                placeholder="Write text for post"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button onClick={handleSubmit}>Create</button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CreatePost;
