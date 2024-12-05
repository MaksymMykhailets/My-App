import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, addPost, addComment } from "./operations";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        const post = state.posts.find((p) => p.id === postId);
        if (post) {
          post.comments.push(comment);
        }
      });
  },
});

export default postsSlice.reducer;
