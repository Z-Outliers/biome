import axios, { type AxiosRequestConfig } from "axios";
import { baseURL } from "@/utils/constants";

const client = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export default client;

export const get = async <T>(url: string, config?: AxiosRequestConfig) => {
  const response = await client.get<T>(url, config);
  return response.data;
};

export const post = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) => {
  const response = await client.post<T>(url, data, config);
  return response.data;
};

export const patch = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
) => {
  const response = await client.patch<T>(url, data, config);
  return response.data;
};
