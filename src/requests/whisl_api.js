import axios from "axios";
import jwt_decode from "jwt-decode";

const BASE_URL = process.env.REACT_APP_WHISL_API_URL;

const axios_with_header = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const checkIfTokenExpired = (token) => {
  const decoded = jwt_decode(token);
  let expired = decoded.exp < Date.now() / 1000 ? true : false;

  return expired;
};

axios_with_header.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    const refreshTokenData = localStorage.getItem("refresh_token");

    if (checkIfTokenExpired(refreshTokenData)) {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      window.location.replace("/logout");
    }

    if (checkIfTokenExpired(token)) refreshToken();

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const loginUser = async (username, password) => {
  const data = {
    username: username,
    password: password,
  };
  const config = {
    method: "post",
    url: `${BASE_URL}auth/token`,
    data: data,
  };

  const response = await axios(config);

  if (response.status === 200) {
    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);

    return response.data;
  }
  return response;
};

const refreshToken = async () => {
  const config = {
    method: "post",
    url: `${BASE_URL}auth/token/refresh`,
    data: { refresh_token: localStorage.getItem("refresh_token") },
  };
  const response = axios(config);
  response.then((res) => {
    localStorage.setItem("token", res.data.access_token);
  });

  return response;
};

const getOrderInfo = async (orderId) => {
  const config = {
    method: "get",
    url: `order/order_info_from_provider/${orderId}`,
  };

  const response = await axios_with_header(config);

  return response;
};

const getOrdersFromProvider = async () => {
  const data = {
    searchItems: [],
    paginationData: {
      pageNo: 0,
      resultCount: 1000,
    },
  };

  const config = {
    method: "post",
    url: `order/orders_from_provider`,
    data: data,
  };

  const response = await axios_with_header(config);

  return response;
};

const getCountriesFromProvider = () => {
  const config = {
    method: "get",
    url: `location/countries`,
  };
  return axios_with_header(config);
};

const getStatesFromProvider = async () => {
  const config = {
    method: "get",
    url: `location/states`,
  };

  return axios_with_header(config);
};

const searchNumbers = async (data) => {
  const config = {
    method: "post",
    url: `number/search_numbers`,
    data: data,
  };

  return axios_with_header(config);
};

const getLergDataFromProvider = (data) => {
  const config = {
    method: "post",
    url: `location/lerg_data`,
    data: data,
  };

  return axios_with_header(config);
};

const createOrder = async (data) => {
  const config = {
    method: "post",
    url: `order/create_order_on_provider`,
    data: data,
  };

  return axios_with_header(config);
};

const getAllClients = async () => {
  const config = {
    method: "get",
    url: `client`,
  };

  return axios_with_header(config);
};

const getAllAccounts = async () => {
  const config = {
    method: "get",
    url: `account`,
  };

  return axios_with_header(config);
};

const getUserRoles = async () => {
  const config = {
    method: "get",
    url: `role`,
  };

  return axios_with_header(config);
};

const request = {
  loginUser,
  getOrdersFromProvider,
  getCountriesFromProvider,
  getStatesFromProvider,
  getLergDataFromProvider,
  createOrder,
  refreshToken,
  searchNumbers,
  getOrderInfo,
  checkIfTokenExpired,
  getAllClients,
  getAllAccounts,
  getUserRoles,
};

export default request;
