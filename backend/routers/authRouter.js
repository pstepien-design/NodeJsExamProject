import { Router } from 'express';
import User from '../entities/User.js';
import fetch from 'node-fetch';
import {
  login,
  signup,
} from '../authentication/authentication.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
const authRouter = Router();

authRouter.post('/auth/signup', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const response = await signup(email, password);

  try {
    if (response) {
      const user = new User(
        email,
        req.body.firstName,
        req.body.lastName,
        response.localId
      );
      const createUser = await fetch(
        'https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=' +
          response.idToken,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      );
      if (!createUser.ok) {
        res.status(400).send(response);
      } else {
        res.send({ accessToken: response.idToken });
      }
    }
    
  } catch (error) {
    res.send(error)
  }
  
});

authRouter.post('/auth/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const response = await login(email, password);

  try {
    if (response.email !== undefined) {
      const fetchUsers = await fetch(
        `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=` +
          response.idToken,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const fetchedUsers = await fetchUsers.json();
      for (const key in fetchedUsers) {
        const obj = fetchedUsers[key];
        if (obj.email == req.body.email) {
          res.send({ accessToken: response.idToken });
        } 
      }
    } 
    else {
      res.status(400).send(response);
    }
  } catch (error) {
    res.send(error)
  }
  
});

export default authRouter;
