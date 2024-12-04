import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref as dbRef, set, update } from "firebase/database";
import { auth } from "../../db/firebase";

export const registerUser = createAsyncThunk(
  "users/register",
  async ({ email, password, displayName, avatar }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      let avatarURL = avatar || null;

      await updateProfile(user, {
        displayName,
        photoURL: avatarURL,
      });

      const db = getDatabase();
      await set(dbRef(db, `users/${user.uid}`), {
        uid: user.uid,
        email: user.email,
        displayName,
        avatar: avatarURL,
        createdAt: new Date().toISOString(),
      });

      return {
        uid: user.uid,
        email: user.email,
        displayName,
        avatar: avatarURL,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "No display name",
        photoURL: user.photoURL || null,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk("users/logout", async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateAvatar = createAsyncThunk(
  "users/updateAvatar",
  async (avatarUri, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Користувач не авторизований");

      const db = getDatabase();
      const userRef = dbRef(db, `users/${user.uid}`);

      await update(userRef, { avatar: avatarUri });

      return avatarUri;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);