import { writable } from "svelte/store";

export const serverUrl = writable("http://localhost:3000");

// accessToken
export const accessToken = writable(
  sessionStorage.getItem("accessToken") || null
);

export function saveToken(token) {
  sessionStorage.setItem("accessToken", token);
  accessToken.set(sessionStorage.getItem("accessToken"));
}

export function getAccessToken() {
  let token = "";

  accessToken.set(sessionStorage.getItem("accessToken"));
  accessToken.subscribe((value) => {
    token = value;
  });

  return token;
}

export function removeAccessToken() {
  accessToken.set(sessionStorage.removeItem("accessToken"));
}

// refreshToken
export const refreshToken = writable(
  sessionStorage.getItem("refreshToken") || null
);

export function saveRefreshToken(token) {
  sessionStorage.setItem("refreshToken", token);
  refreshToken.set(sessionStorage.getItem("refreshToken"));
}

export function getRefreshToken() {
  let token = "";

  refreshToken.set(sessionStorage.getItem("refreshToken"));
  refreshToken.subscribe((value) => {
    token = value;
  });

  return token;
}

export function removeRefreshToken() {
  refreshToken.set(sessionStorage.removeItem("refreshToken"));
}

// User
export const userId = writable(sessionStorage.getItem("userId") || null);

export function saveUserId(id) {
  sessionStorage.setItem("userId", id);
  userId.set(sessionStorage.getItem("userId"));
}

export function getUserId() {
  let id = "";

  userId.set(sessionStorage.getItem("userId"));
  userId.subscribe((value) => {
    id = value;
  });

  return id;
}

export function removeUserId() {
  userId.set(sessionStorage.removeItem("userId"));
}

export const getUser = async () => {
  const id = getUserId();
  const token = getAccessToken();

  if (id) {
    const response = await fetch(`http://localhost:3000/users/name`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const json = await response.json();
      const user = json.loggedUser;
      if (user !== null) {
        return user;
      }
    }
  }
  return null;
};

export const updateUser = async (userFirstName, userLastName) => {
  const id = getUserId();
  const token = getAccessToken();

  const updatedUser = {
    firstName: userFirstName,
    lastName: userLastName,
  };

  const response = await fetch(`http://localhost:3000/users/name`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedUser),
  });

  if (response.ok) {
    const data = await response.json();

    return data;
  } else {
    return "error";
  }
};

// Cocktails
export const getCocktails = async () => {
  const token = getAccessToken();

  const response = await fetch(`http://localhost:3000/cocktails`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const cocktails = response.json();

    return cocktails;
  }
};

// theBeer
export const beerValue = writable(sessionStorage.getItem("beerValue") || null);

export const saveBeerValue = async (value) => {
  sessionStorage.setItem("beerValue", value);
  beerValue.set(sessionStorage.getItem("beerValue"));

  const token = getAccessToken();

  const authRequest = {
    value: value,
  };

  const response = await fetch("http://localhost:3000/theBeer", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(authRequest),
  });

  if (response.ok) {
    return response.json();
  }
};

export const getBeerValue = async () => {
  const token = getAccessToken();

  const response = await fetch(`http://localhost:3000/theBeer/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const value = await response.json();
    saveBeerValue(value.valueOfBeer);
    return value;
  }
};

// hasClicked
export const userHasClicked = async (hasClicked) => {
  const user = await getUser();
  user.hasClicked = hasClicked;
  const token = getAccessToken();
  const response = await fetch(`http://localhost:3000/users/name`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    const data = await response.json();

    return data.hasClicked;
  }
};
