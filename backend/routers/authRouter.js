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
      res.send({ data: 'Was not able to create user' });
    } else {
      res.send({ accessToken: response.idToken });
    }
  }
});

authRouter.post('/auth/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const response = await login(email, password);
  if (response) {
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
    const fetchedUser = await fetchUsers.json();
    for (const key in fetchedUser) {
      const obj = fetchedUser[key];
      console.log(obj)
      if (obj.email == req.body.email) {
        res.send({ accessToken: response.idToken });
      } 
      // else {
      //   res.send({
      //     data: 'Something went wrong in fetching user from the database',
      //   });
      // }
    }
  } 
  // else {
  //   res.send({ data: "User doesn't exist" });
  // }
});

export default authRouter;
