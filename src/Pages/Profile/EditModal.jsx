import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateUserfn } from "../../Redux/extraReducer";

function EditModal({ editedData, setVisibleEditModal, setEditedData }) {
  const dispatch = useDispatch();
  let userData;
  userData = JSON.parse(localStorage.getItem("userData"));
  const handleChange = (event) => {
    setEditedData({ ...editedData, [event.target.name]: event.target.value });
  };
  const handleUpdateUser = () => {
    dispatch(UpdateUserfn(editedData));
    userData.name = editedData.name;
    userData.fullName = editedData.fullName;
    localStorage.setItem("userData", JSON.stringify(userData));
    window.location.reload();
  };
  return (
    <div className="edit-user">
      <div className="edit-user-content">
        <h2 className="title">Edit User</h2>
        <input
          type="text"
          name="name"
          placeholder="Enter UserName"
          onChange={(e) => handleChange(e)}
          value={editedData.name}
        />
        <input
          type="text"
          name="fullName"
          placeholder="Enter FullName"
          onChange={(e) => handleChange(e)}
          value={editedData.fullName}
        />
        <div className="buttons">
          <button onClick={() => setVisibleEditModal(false)}>Cancel</button>
          <button onClick={handleUpdateUser}>Coniform</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
