import { getAccessToken } from "./auth";

let refreshTokenPromise: Promise<string | undefined> | null = null;

export const refreshToken = async (): Promise<string | undefined> => {
  // If a token refresh is already in progress, return the existing promise.
  // This prevents multiple simultaneous token refresh requests from being made.
  if (refreshTokenPromise) {
    return refreshTokenPromise;
  }

  refreshTokenPromise = getAccessToken()
    .then((newToken) => {
      refreshTokenPromise = null;
      return newToken;
    })
    .catch((error) => {
      refreshTokenPromise = null;
      throw error;
    });

  return refreshTokenPromise;
};
