import { createSlice } from "@reduxjs/toolkit";

const data = localStorage.getItem("all_data")
  ? JSON.parse(localStorage.getItem("all_data"))
  : "";

const initialState = {
  authenticated: data.authenticated ? data.authenticated : false,
  token: data.token ? data.token : "",
  apis_tokens: data.apis_tokens ? { cpass_nuso: data.apis_tokens } : {},
  user_info: data.user_info ? data.user_info : {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.authenticated = payload.authenticated;
      state.token = payload.token;
      state.user_info = payload.user_info;
      state.apis_tokens = { cpass_nuso: payload.nuso_access_token };
      localStorage.setItem("all_data", JSON.stringify(payload));
    },
    logout: (state, { payload }) => {
      state.authenticated = payload.authenticated;
      state.token = "";
      state.user_info = {};
      state.apis_tokens = {};
      localStorage.removeItem("all_data");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
