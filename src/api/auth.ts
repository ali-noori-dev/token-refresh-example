import { Auth0Client } from "@auth0/auth0-spa-js";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

export const auth0 = new Auth0Client({
  domain,
  clientId,
});

export const getAccessToken = async (): Promise<string> => {
  const token = await auth0.getTokenSilently();
  return token;
};
