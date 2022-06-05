import {
  serverUrl,
  saveToken,
  saveRefreshToken,
  saveUserId,
  getUserId,
  getToken,
} from '../stores/store';
import { get } from 'svelte/store';

export async function login(email, password) {
  let loginSuccessful = false;
  const res = await fetch(`${get(serverUrl)}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'content-type': 'application/json',
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
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });
  const json = await res.json();
  const token = json.accessToken;
  const id = json.id;
  saveToken(token);
  saveUserId(id);
  return json;
}

