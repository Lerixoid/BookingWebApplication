import axios from "axios";

import globalUrls from "../Utility/Urls";

export default axios.create({
  baseURL: globalUrls.BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: globalUrls.BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
