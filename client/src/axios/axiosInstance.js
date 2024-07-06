import axios from "axios";
const BASE_URL = process.env.REACT_APP_URL;
const Instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});
export const PrivateInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

export default Instance;
