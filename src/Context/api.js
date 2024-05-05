"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "./features/auth/authSlice";
import TokenService from "@/utils/Token.service";
import { requestFreshToken } from "./features/auth/authApiSlice";

const apiLink =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BACKEND_PROD
    : process.env.NEXT_PUBLIC_BACKEND_DEV;

const baseQuery = fetchBaseQuery({
  baseUrl: apiLink,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = TokenService.getLocalAccessToken();
    const refreshToken = TokenService.getLocalRefreshToken();
    console.log(token);
    const tokenExpired = TokenService.isAccessExpired();
    if (token) {
      if (!tokenExpired) {
        headers.set("authorization", `Bearer ${token}`);
      } else {
        headers.set("authorization", `Bearer ${token}`);
        headers.set("x-refresh", `${refreshToken}`);
      }
    }
    return headers;
  },
  fetchFn: (...args) => {
    return fetch(...args, { mode: "cors" });
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 401) {
    console.log("sending refresh token");
    const response = await requestFreshToken();
    const refreshResult = await response.json();
    console.log(response);
    console.log(refreshResult);
    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials(refreshResult));
      TokenService.updateLocalAccessToken(refreshResult);
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("logout");
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
