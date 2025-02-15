import axios from "axios";
import { removeSession } from "./session";

const apis = axios.create({
  baseURL: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
  timeout: 3000,
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
  responseType: "json",
  withCredentials: true
});

apis.interceptors.request.use((config) => {
  return config;
}, (err) => {
  return Promise.reject(err);
});

export default apis;

export const getApi = async (url, params = {}, config = {}) => {
  try {
    const response = await apis.get(url, { params, ...config });
    return response?.data ?? [];
  } catch (error) {
    if (error.response.status === 401) {
      await removeSession();
    }
    throw new Error(error);
  }
};

export const postApi = async (url, data = {}, config = {}) => {
  try {
    const response = await apis.post(url, data, { ...config });
    return response?.data ?? [];
  } catch (error) {
    if (error.response.status === 401) {
      await removeSession();
    }
    throw new Error(error);
  }
};

export const putApi = async (url, data = {}, config = {}) => {
  try {
    const response = await apis.put(url, data, { ...config });
    return response?.data ?? [];
  } catch (error) {
    if (error.response.status === 401) {
      await removeSession();
    }
    throw new Error(error);
  }
};

