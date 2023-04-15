import axios from "axios";
import nusoapi from "./nuso_api_requests.js";

const BASE_URL = process.env.REACT_APP_NUSO_API_URL;

const login = async (email) => {
  localStorage.setItem("user-info", JSON.stringify({ email: email }));
  let access_token = await nusoapi.accessToken();

  return access_token;
};

const register = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const logout = async () => {
  localStorage.removeItem("access-token");
  localStorage.removeItem("user-info");
  window.location.replace("/");
};

const sign_in = {
  login,
  register,
  logout,
};

export default sign_in;
