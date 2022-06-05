import fetch from 'node-fetch';
import User from '../entities/User.js';
import { Router } from 'express';
const userRouter = Router();

userRouter.post('/users/name', async (req, res) => {
  const token = req.body.token;
  const id = req.body.id;
  console.log('token', token);
  console.log('id', id);

  const response = await fetch(
    'https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=' +
      token,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    res.send({ loggedUser: null });
  } else {
    const data = await response.json();
    let user = null;

    for (const key in data) {
      const obj = data[key];
      if (obj.id === id) {
        user = new User(obj.email, obj.firstName, obj.lastName, obj.id);
      }
    }
    res.send({ loggedUser: user });
  }
});

export default userRouter;
