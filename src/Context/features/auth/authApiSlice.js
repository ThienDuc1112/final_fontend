"use client";
import { apiSlice } from "../../api";

export const loginA = async (user, pwd) => {
  const response = await fetch("https://localhost:5007/connect/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json, text/plain, */*",
    },
    body: new URLSearchParams({
      grant_type: "password",
      client_id: "nextjs",
      client_secret: "adminSecret",
      scope: "openid profile roles offline_access providerAPI",
      username: user,
      password: pwd,
    }),
  });
  return response;
};

export const requestFreshToken = async (refreshToken) => {
  const response = await fetch("https://localhost:5007/connect/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json, text/plain, */*",
    },
    body: new URLSearchParams({
      client_id: "nextjs",
      client_secret: "adminSecret",
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  return response;
};

export const loginByGoogle = async (token) => {
  const response = await fetch("https://localhost:5007/connect/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json, text/plain, */*",
    },
    body: new URLSearchParams({
      grant_type: "external",
      client_id: "nextjs",
      client_secret: "adminSecret",
      scope: "openid profile roles offline_access providerAPI",
      provider: "google",
      external_token: token,
    }),
  });
  return response;
};

export const getUserInfo = async (accessToken) => {
  const url = 'https://localhost:5011/userinfo';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (response.ok) {
    const userInfo = await response.json();
    return userInfo;
  } else {
    throw new Error('Failed to fetch user info');
  }
};
