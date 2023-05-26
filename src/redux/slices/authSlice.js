import { createSlice } from "@reduxjs/toolkit";

const data = localStorage.getItem("all_data")
  ? JSON.parse(localStorage.getItem("all_data"))
  : "";

const initialState = {
  authenticated: data !== "" ? true : false,
  token: data !== "" ? data.token : "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.authenticated = payload.authenticated;
      state.token = payload.token;
      localStorage.setItem("all_data", JSON.stringify(payload));
    },
    logout: (state, { payload }) => {
      state.authenticated = payload.authenticated;
      state.token = "";
      state.account_id = "";
      localStorage.removeItem("all_data");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
