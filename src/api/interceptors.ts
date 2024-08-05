import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { getAccessToken } from "./auth";
import { refreshToken } from "./refreshToken";

export const setupInterceptors = (api: AxiosInstance) => {
  const retryRequest = async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return refreshToken()
        .then((newToken) => {
          if (newToken) {
            api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          return axios(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    return Promise.reject(error); // Reject the promise if the error is not a 401 or if the request has already been retried
  };

  const addAuthToken = async (config: InternalAxiosRequestConfig) => {
    const token = await getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  const handleRequestError = (error: AxiosError) => Promise.reject(error);

  api.interceptors.request.use(addAuthToken, handleRequestError);

  api.interceptors.response.use((response) => response, retryRequest);
};
