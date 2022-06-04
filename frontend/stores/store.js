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

export function removeToken(){
  accessToken.set(sessionStorage.removeItem('accessToken'));
}

export const refreshToken = writable(
  sessionStorage.getItem('refreshToken') || null
)

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

export function removeRefreshToken(){
  refreshToken.set(sessionStorage.removeItem('refreshToken'));
}