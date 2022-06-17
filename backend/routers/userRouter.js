import fetch from 'node-fetch';
import User from '../entities/User.js';
import { Router } from 'express';
const userRouter = Router();

userRouter.get('/users/name/:id/:token', async (req, res) => {
  const token = req.params.token;
  const id = req.params.id;

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
        user = new User(
          obj.email,
          obj.firstName,
          obj.lastName,
          obj.id,
          obj.hasClicked
        );
      }
    }
    res.send({ loggedUser: user });
  }
});

// Updating hasClicked
userRouter.patch('/users/name/:id/:token', async (req, res) => {
  const hasClicked = req.body.hasClicked;
  const token = req.params.token;
  const id = req.params.id;

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
    console.log(await response.json());
  } else {
    const users = await response.json();
    for (const key in users) {
      if (id == users[key].id) {
        users[key].hasClicked = hasClicked;

        const response2 = await fetch(
          `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/users/${key}.json?auth=` +
            token,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(users[key]),
          }
        );

        if (!response2.ok) {
          console.log(await response.json());
        } else {
          res.send(users);
        }
      }
    }
  }
});

export default userRouter;
