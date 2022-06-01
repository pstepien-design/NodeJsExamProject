import { serverUrl } from '../stores/store';
import { get } from 'svelte/store';

export function saveToken(token){
  sessionStorage.setItem('token', token);
}
export function getToken(){
  return sessionStorage.getItem('token');
}


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
  const json = await res.json();
  const accessToken = (json).accessToken
  console.log(accessToken);
  saveToken(accessToken)
  return json
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
  const accessToken = (json).accessToken
  saveToken(accessToken)
  console.log(json);
}

