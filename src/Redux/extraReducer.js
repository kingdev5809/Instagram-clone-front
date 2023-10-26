import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000",
});
export const getAllPosts = createAsyncThunk("getAllPosts", async () => {
  const res = await API.get("post/all");
  return res.data;
});

export const CreateNewPost = createAsyncThunk("CreatePost", async (data) => {
  const res = await API.post("post/add", data);
  return res.data;
});

export const UpdateUserfn = createAsyncThunk("UpdateUserfn", async (data) => {
  const res = await API.post(`user/edit`, data);
  return res.data;
});

export const RemovePost = createAsyncThunk("RemovePost", async (id) => {
  const res = await API.delete(`post/${id}`);
});

export const CreateComment = createAsyncThunk("CreateComment", async (data) => {
  const res = await API.post("comment", data);
  return res.data;
});

export const AllComments = createAsyncThunk("Comments", async (id) => {
  const res = await API.get(`comment/${id}`);
  return res.data;
});

export const RegisterUser = createAsyncThunk("Register", async (data) => {
  const res = await API.post("user/register", data);
  return res.data;
});

export const LoginUser = createAsyncThunk("Login", async (data) => {
  const res = await API.post("user/login", data);
  return res.data;
});

export const LikeThePostApi = createAsyncThunk("like", async (data) => {
  const res = await API.post("post/like", data);
  return res.data;
});
export const GetUserPosts = createAsyncThunk("userPosts", async (id) => {
  const res = await API.get(`post/user/${id}`);
  return res.data;
});
export const DeletePost = createAsyncThunk("deletePosts", async (id) => {
  const res = await API.post(`post/delete/${id}`);
  return res.data;
});

export const GetAllUsersApi = createAsyncThunk("users-get", async () => {
  const res = await API.get("user/all");
  return res.data;
});
export const GetOneUserApi = createAsyncThunk("user-get", async (id) => {
  const res = await API.get(`user/${id}`);
  return res.data;
});

export const FollowUserApi = createAsyncThunk("follow", async (data) => {
  const res = await API.post("user/follow", data);
  return res.data;
});
