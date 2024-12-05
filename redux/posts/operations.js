import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, set, push, get, child, update } from "firebase/database";

export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async ({ userId }, { rejectWithValue }) => {
      try {
        const db = getDatabase();
        const snapshot = await get(ref(db, `users/${userId}/posts`));
        if (snapshot.exists()) {
          const data = snapshot.val();
          return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        }
        return [];
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );  

  export const addPost = createAsyncThunk(
    "posts/addPost",
    async ({ userId, post }, { rejectWithValue }) => {
      try {
        const db = getDatabase();
        const postRef = push(ref(db, `users/${userId}/posts`));
        const newPost = {
          ...post,
          id: postRef.key,
          comments: [],
          createdAt: new Date().toISOString(),
        };
        await set(postRef, newPost);
        return newPost;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );    

export const addComment = createAsyncThunk(
    "posts/addComment",
    async ({ userId, postId, comment }, { rejectWithValue }) => {
      try {
        const db = getDatabase();
        const commentsRef = ref(db, `users/${userId}/posts/${postId}/comments`);
        const newCommentRef = push(commentsRef);
        const newComment = {
          ...comment,
          id: newCommentRef.key,
          createdAt: new Date().toISOString(),
        };
        await set(newCommentRef, newComment);
        return { postId, comment: newComment };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
