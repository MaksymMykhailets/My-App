import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import { auth } from '../../db/firebase';

export const registerUser = async ({ email, password, displayName, avatar }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    let avatarURL = null;

    await updateProfile(userCredential.user, {
      displayName,
      photoURL: avatarURL,
    });

    const db = getDatabase();
    await set(dbRef(db, `users/${userCredential.user.uid}`), {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName,
      avatar: avatarURL,
      createdAt: new Date().toISOString(),
    });

    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName,
      avatar: avatarURL,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};
