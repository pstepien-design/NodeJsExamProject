import { writable } from 'svelte/store';

export const serverUrl = writable('http://localhost:3000');

export const accessToken = writable(
  sessionStorage.getItem('accessToken') || null
);
export function saveToken(token) {
  sessionStorage.setItem('accessToken', token);
  accessToken.set(sessionStorage.getItem('accessToken'));
}
export function getToken() {
  let token = '';
  accessToken.set(sessionStorage.getItem('accessToken'));
  accessToken.subscribe((value) => {
    token = value;
  });
  return token;
}

export function removeToken() {
  accessToken.set(sessionStorage.removeItem('accessToken'));
}

export const refreshToken = writable(
  sessionStorage.getItem('refreshToken') || null
);

export function saveRefreshToken(token) {
  sessionStorage.setItem('refreshToken', token);
  refreshToken.set(sessionStorage.getItem('refreshToken'));
}
export function getRefreshToken() {
  let token = '';
  refreshToken.set(sessionStorage.getItem('refreshToken'));
  refreshToken.subscribe((value) => {
    token = value;
  });
  return token;
}

export function removeRefreshToken() {
  refreshToken.set(sessionStorage.removeItem('refreshToken'));
}

export const userId = writable(sessionStorage.getItem('userId') || null);
export function saveUserId(id) {
  sessionStorage.setItem('userId', id);
  userId.set(sessionStorage.getItem('userId'));
}
export function getUserId() {
  let id = '';
  userId.set(sessionStorage.getItem('userId'));
  userId.subscribe((value) => {
    id = value;
  });
  return id;
}

export function removeUserId() {
  userId.set(sessionStorage.removeItem('userId'));
}
export const doesUserExist = async () => {
  let userExists = false;
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
    const user = json.loggedUser;
    if (user !== null) {
      userExists = true;
    }
  }
  return userExists;
};
