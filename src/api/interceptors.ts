import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { FailedQueueItem } from "../types";
import { getAccessToken } from "./auth";

export const setupInterceptors = (api: AxiosInstance) => {
  let isRefreshing = false;
  let failedQueue: FailedQueueItem[] = []; // Queue to hold failed requests during token refresh

  const processQueue = (
    error: AxiosError | null,
    token: string | null = null
  ) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token!);
      }
    });

    failedQueue = [];
  };

  const queueFailedRequest = async (
    originalRequest: InternalAxiosRequestConfig
  ) => {
    return new Promise<string>((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    })
      .then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest); // Retry the original request
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };

  const handleTokenRefresh = async (
    originalRequest: InternalAxiosRequestConfig
  ) => {
    return new Promise<string>((resolve, reject) => {
      getAccessToken()
        .then((newToken) => {
          api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          processQueue(null, newToken); // Process the queue of failed requests
          resolve(newToken);
        })
        .catch((err) => {
          processQueue(err as AxiosError, null); // Process the queue with the error
          reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    }).then((token) => {
      // Retry the original request with the new token
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return axios(originalRequest);
    });
  };

  const retryRequest = async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return queueFailedRequest(originalRequest);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return handleTokenRefresh(originalRequest);
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
