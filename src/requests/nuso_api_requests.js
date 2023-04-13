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
    url: `${BASE_URL}oauth/token`,
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
    const response = await axios.get(`${BASE_URL}order/${orderId}`, {
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
      `${BASE_URL}order/search-value`,
      {
        searchItems: [
          // {
          //   searchField: "CUSTOMER",
          //   searchText: "Callsy",
          // },
          {
            searchField: "STATUS",
            searchText: "COMPLETED",
          },
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
    const response = await axios.get(`${BASE_URL}country`, {
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
    const response = await axios.get(`${BASE_URL}state`, {
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
    const response = await axios.post(`${BASE_URL}did/search`, searchOptions, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return response.data;
  } catch (err) {
    accessToken();
  }
};

const getCustomerAccount = async () => {
  // https://cpaas-aws.brightlink.com/brightlink/v1/customer/shopping/account
  if (localStorage.getItem("access-token") == null) {
    accessToken();
  }

  try {
    const access_token = localStorage.getItem("access-token");
    const response = await axios.post(
      `${BASE_URL}customer/shopping/account`,
      { searchItems: [] },
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
};

export default requests;
