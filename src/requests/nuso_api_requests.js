import axios from "axios";
import qs from "qs";

const BASE_URL = process.env.REACT_APP_NUSO_API_URL;

const accessToken = async () => {
  let data = qs.stringify({
    username: process.env.REACT_APP_NUSO_USERNAME,
    password: process.env.REACT_APP_NUSO_PASSWORD,
    grant_type: "password",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}v1/oauth/token`,
    auth: {
      username: process.env.REACT_APP_NUSO_API_KEY_USERNAME,
      password: process.env.REACT_APP_NUSO_API_KEY,
    },
    headers: {
      Accept: "application/vnd.brightlink.v1+json",
      "Accept-Language": "en-US,en;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic Y2xheTpyS2lDeVlrWVNNbFlTaG9KeHNnNVAwcmRMVDRKaXpQdA==",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    localStorage.setItem("access-token", response.data.access_token);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getOrderInfo = async (orderId) => {
  if (localStorage.getItem("access-token") == null) {
    accessToken();
  }

  try {
    const access_token = localStorage.getItem("access-token");
    const response = await axios.get(`${BASE_URL}v2/order/${orderId}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data;
  } catch (err) {
    accessToken();
  }
};

const getOrderList = async (page, resultCount) => {
  if (localStorage.getItem("access-token") == null) {
    accessToken();
  }

  try {
    const access_token = localStorage.getItem("access-token");
    const response = await axios.post(
      `${BASE_URL}v1/order/search-value`,
      {
        searchItems: [
          // {
          //   searchField: "CUSTOMER",
          //   searchText: "Callsy",
          // },
          // {
          //   searchField: "STATUS",
          //   searchText: "COMPLETED",
          // },
        ],
        paginationData: {
          pageNo: 0,
          resultCount: 10,
        },
        sortBy: "DATE",
        accending: false,
      },
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    return response.data;
  } catch (err) {
    accessToken();
  }
};

const getCountries = async () => {
  if (localStorage.getItem("access-token") == null) {
    accessToken();
  }

  try {
    const access_token = localStorage.getItem("access-token");
    const response = await axios.get(`${BASE_URL}v1/country`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return response.data;
  } catch (err) {
    accessToken();
  }
};

const getStates = async () => {
  if (localStorage.getItem("access-token") == null) {
    accessToken();
  }

  try {
    const access_token = localStorage.getItem("access-token");
    const response = await axios.get(`${BASE_URL}v1/state`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return response.data;
  } catch (err) {
    accessToken();
  }
};

const searchNumbers = async (searchOptions) => {
  if (localStorage.getItem("access-token") == null) {
    accessToken();
  }

  try {
    const access_token = localStorage.getItem("access-token");
    const response = await axios.post(`${BASE_URL}v1/did/search`, searchOptions, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return response.data;
  } catch (err) {
    accessToken();
  }
};

const getCustomerAccount = async () => {
  if (localStorage.getItem("access-token") == null) {
    accessToken();
  }

  try {
    const access_token = localStorage.getItem("access-token");
    const response = await axios.post(
      `${BASE_URL}v1/customer/shopping/account`,
      { searchItems: [] },
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    return response.data;
  } catch (err) {
    accessToken();
  }
};

const createOrder = async (order) => {
  // order/create-and-place
  if (localStorage.getItem("access-token") == null) {
    accessToken();
  }

  try {
    const access_token = localStorage.getItem("access-token");
    const response = await axios.post(
      `${BASE_URL}v2/order/create-and-place`,
      order,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    return response.data;
  } catch (err) {
    accessToken();
  }
};

const requests = {
  accessToken,
  getOrderList,
  getOrderInfo,
  getCountries,
  getStates,
  searchNumbers,
  getCustomerAccount,
  createOrder,
};

export default requests;
