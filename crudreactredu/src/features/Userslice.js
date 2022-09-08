import { createSlice } from "@reduxjs/toolkit";

const userslice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    adduser(state, action) {
      state.user = action.payload;
    },
    logout(state, action) {
      state.user = null;
    },
  },
});

export const { adduser, logout } = userslice.actions;
export const userdapat = (state) => state.user.user;
export default userslice.reducer;
