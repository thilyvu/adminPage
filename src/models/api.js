import axios from "axios";
import interceptors from "./interceptor";
import { API_URL } from "./base";
const Api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 5000, // request timeout
});

interceptors.setup(Api);
interceptors.checkToken(Api);

export default Api;
