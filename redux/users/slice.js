import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = usersSlice.actions;
export default usersSlice.reducer;
