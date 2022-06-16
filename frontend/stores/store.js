import { writable } from 'svelte/store';

export const serverUrl = writable('http://localhost:3000');

// accessToken
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

// refreshToken
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

// User
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
export const getUser = async () => {
  const authRequest = {
    token: getToken(),
    id: getUserId(),
  };
  const response = await fetch(`http://localhost:3000/users/name/${authRequest.id}/${authRequest.token}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const json = await response.json();
    const user = json.loggedUser;
    if (user !== null) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// theBeer
export const beerValue = writable(sessionStorage.getItem('beerValue') || null);

export const saveBeerValue= async(value) => {
  sessionStorage.setItem('bearValue', value);
  beerValue.set(sessionStorage.getItem('beerValue'));

  const authRequest = {
    token: getToken(),
    value: value
  };

  const response = await fetch('http://localhost:3000/theBeer', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authRequest),
  });

  if(response.ok) {
    const data = response.json();

    return data;
  }


}

export const getBeerValue = async () => {
  const token = getToken()
  const response = await fetch(`http://localhost:3000/theBeer/${token}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const value = await response.json()
    saveBeerValue(value.valueOfBeer)
    return value
  }
};
