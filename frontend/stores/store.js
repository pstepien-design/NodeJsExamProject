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
