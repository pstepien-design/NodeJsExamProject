import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export const signup = async (email, password) => {
  const API_KEY = process.env.API_KEY;

  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
  
    if (!response.ok) {
      return response.status + ' ' + response.statusText;

    } else {
      const data = await response.json();
      return data;
    }
    
  } catch (error) {
    return error;
  }

};

export const login = async (email, password) => {
  const API_KEY = process.env.API_KEY;

  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
  
    if (!response.ok) {
      return response.status + ' ' + response.statusText;
  
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return error;
  }
 
};
