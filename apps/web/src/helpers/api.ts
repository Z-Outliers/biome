import type { AxiosError, AxiosResponse } from "axios";
import type { ApiError } from "@/types";
import { baseURL } from "@/utils/constants";

const defaultErrorMessage = "Some error happened, try again later.";

function parseApiError(error: unknown): ApiError {
  if ((error as AxiosError).isAxiosError) {
    const axiosErr = error as AxiosError;
    const status = axiosErr.response?.status ?? 500;
    const data = axiosErr.response?.data as Partial<ApiError> | undefined;

    let message = data?.message || defaultErrorMessage;
    if (status >= 500) message = defaultErrorMessage;

    return {
      message: message as string,
      status,
      icon: data?.icon,
    };
  }

  return {
    message: (error as Error)?.message ?? defaultErrorMessage,
    status: 500,
  };
}

export const constructLog = (res: AxiosResponse | AxiosError) => {
  const url = res.request?.responseURL?.substring(baseURL.length);
  return `[${res.request?._method}] ${url} ${res.request?.status}`;
};

export const onAxiosError = (error: AxiosError) => {
  console.log(constructLog(error));
  const parsedError = parseApiError(error);
  console.log(parsedError);
  return Promise.reject(parsedError);
};
