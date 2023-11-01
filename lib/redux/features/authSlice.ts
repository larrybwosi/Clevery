import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  user: {
    id: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
  },
  isLoading: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setIsAuthenticated, setIsLoading } = authSlice.actions;

export default authSlice.reducer;
