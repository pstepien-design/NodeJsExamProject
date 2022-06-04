import { serverUrl, getToken, saveToken } from '../stores/store';
import { get } from 'svelte/store';

export async function login(email, password) {
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
  if (res.ok) {
    const json = await res.json();
    const token = json.accessToken;
    saveToken(token);
    return json;
  }
}

export async function signup(email, password) {
  console.log(get(serverUrl));
  const res = await fetch(`${get(serverUrl)}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });
  const json = await res.json();
  console.log(json);
  const token = json.accessToken;
  saveToken(token);
  return json;
}
