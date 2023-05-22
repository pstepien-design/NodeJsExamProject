import {
  serverUrl,
  saveToken,
  saveRefreshToken,
  saveUserId,
} from "../stores/store";
import { get } from "svelte/store";

export async function login(email, password) {
  let loginSuccessful = false;

  const res = await fetch(`${get(serverUrl)}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (res.status === 200) {
    const json = await res.json();
    const token = json.accessToken;
    const refreshToken = json.refreshToken;
    const id = json.id;
    saveRefreshToken(refreshToken);
    saveToken(token);
    saveUserId(id);

    loginSuccessful = true;
  }

  return loginSuccessful;
}

export async function signup(email, password, firstName, lastName) {
  const res = await fetch(`${get(serverUrl)}/auth/signup`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  const json = await res.json();
  const token = json.accessToken;
  const refreshToken = json.refreshToken;
  const id = json.id;
  saveRefreshToken(refreshToken);
  saveToken(token);
  saveUserId(id);

  return json;
}

export async function verifyToken(accessToken) {
  if (accessToken) {
    const res = await fetch(`${get(serverUrl)}/auth/verifyToken`, {
      method: "POST",
      body: JSON.stringify({
        accessToken,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    return res;
  } else {
    return null;
  }
}
