import fetch from 'node-fetch';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config({path: './.env'});

 export const signup = async (email, password) => {
    const API_KEY = process.env.API_KEY;
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
      console.log(response.status + " "+ response.statusText);
      return false;
    } else {
      const data = await response.json(); 
      return true;// json to javascript
    }
  };

  export const login = async (email, password) => {
    let isAuthorized = false;
    const API_KEY = process.env.API_KEY;
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
      console.log(response.status + " "+ response.statusText);
    }
    else{
      const data = await response.json();
      console.log(data)
      isAuthorized = true;
    }
    return isAuthorized;
  };


  export const authenticateToke = (token) => {
    let isAuthorized = false;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decryptedToken) => {
      if(err){
        console.log(err)
      }
      else{
      isAuthorized = decryptedToken.isAuthorized ; 
      }

    })
    return isAuthorized;
  } 



 

