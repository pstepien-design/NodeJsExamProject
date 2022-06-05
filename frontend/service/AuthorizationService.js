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
  console.log(get(serverUrl));
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
    console.log(json);
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
  console.log(get(serverUrl));
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
  console.log(json);
  const token = json.accessToken;
  const id = json.id;
  saveToken(token);
  saveUserId(id);
  return json;
}

export async function getUser() {
  const authRequest = {
    token: getToken(),
    id: getUserId(),
  };
  const response = await fetch('http://localhost:3000/users/name', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authRequest),
  });
  if (response.ok) {
    const json = await response.json();
    return json.loggedUser;
  }
}
