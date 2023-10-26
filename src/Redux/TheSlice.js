import { createSlice } from "@reduxjs/toolkit";
import {
  CreateNewPost,
  RemovePost,
  CreateComment,
  getAllPosts,
  AllComments,
  RegisterUser,
  LoginUser,
  GetUserPosts,
  GetAllUsersApi,
  GetOneUserApi,
} from "./extraReducer";

const initialState = {
  load: false,
  posts: [],
  Comments: [],
  commentLoader: false,
  commentAdd: false,
  error: "",
  appUser: {},
  userPosts: [],
  allUsers: [],
  oneUser: [],
};
const TheSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.load = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.load = false;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(GetAllUsersApi.pending, (state) => {
        state.load = true;
      })
      .addCase(GetAllUsersApi.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.load = false;
      })
      .addCase(GetAllUsersApi.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(CreateNewPost.pending, (state) => {
        state.load = true;
      })
      .addCase(CreateNewPost.fulfilled, (state, action) => {
        state.load = false;
      })
      .addCase(CreateNewPost.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(RemovePost.pending, (state) => {
        state.load = true;
      })
      .addCase(RemovePost.fulfilled, (state, action) => {
        state.load = false;
      })
      .addCase(RemovePost.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(AllComments.pending, (state) => {
        state.commentLoader = true;
      })
      .addCase(AllComments.fulfilled, (state, action) => {
        state.Comments = action.payload;
        state.commentLoader = false;
      })
      .addCase(AllComments.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(CreateComment.pending, (state) => {
        state.commentLoader = true;
      })
      .addCase(CreateComment.fulfilled, (state, action) => {
        state.commentLoader = false;
        state.commentAdd = !state.commentAdd;
      })
      .addCase(CreateComment.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(RegisterUser.pending, (state) => {
        state.load = true;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.load = false;
        if (action.payload.status) {
          state.appUser = action.payload;
          localStorage.setItem("userData", JSON.stringify(action.payload.user));
          localStorage.setItem(
            "follow",
            JSON.stringify(action.payload.user.folowingUsers)
          );
        } else {
          state.error = action.payload.msg;
        }
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.error = action.payload;
        state.load = false;
      })
      .addCase(LoginUser.pending, (state) => {
        state.load = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.load = false;
        if (action.payload.status) {
          state.appUser = action.payload;
          localStorage.setItem("userData", JSON.stringify(action.payload.user));
          localStorage.setItem(
            "follow",
            JSON.stringify(action.payload.user.folowingUsers)
          );
        } else {
          state.error = action.payload.msg;
        }
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.load = false;
      })
      .addCase(GetUserPosts.pending, (state) => {
        state.load = true;
      })
      .addCase(GetUserPosts.fulfilled, (state, action) => {
        state.load = false;
        state.userPosts = action.payload;
      })
      .addCase(GetUserPosts.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(GetOneUserApi.pending, (state) => {
        state.load = true;
      })
      .addCase(GetOneUserApi.fulfilled, (state, action) => {
        state.load = false;
        state.oneUser = action.payload;
      })
      .addCase(GetOneUserApi.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default TheSlice.reducer;
