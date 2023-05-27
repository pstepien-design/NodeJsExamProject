import fetch from "node-fetch";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

dotenv.config({ path: "./.env" });
const API_KEY = process.env.API_KEY;

export const signup = async (email, password) => {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    return response.json();
  } catch (error) {
    return error;
  }
};

export const refreshAuthToken = async (refreshToken) => {
  try {
    const response = await fetch(
      `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      }
    );

    if (!response.ok) {
      return await response.json();
    } else {
      return await response.json();
    }
  } catch (error) {
    return error;
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: token,
        }),
      }
    );

    if (!response.ok) {
      return await response.json();
    } else {
      return await response.json();
    }
  } catch (error) {
    return error;
  }
};

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth();

export const resetPassword = async (email) => {
  let isSent;
  await sendPasswordResetEmail(auth, email)
    .then(() => (isSent = true))
    .catch((error) => (isSent = error));
  return isSent;
};

export const getUserIdFromToken = async (token) => {
  try {
    const response = await verifyToken(token.split(" ")[1]);
    return response.users[0].localId;
  } catch (error) {
    return error;
  }
};
