import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  axToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeToken: (state, action) => {
      state.axToken = action.payload;
    },
    removeToken: (state) => {
      state.axToken = "";
    },
  },
});
export const { storeToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
