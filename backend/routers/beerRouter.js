import fetch from 'node-fetch';
import { Router } from 'express';
const beerRouter = Router();
const key = process.env.BEER_KEY;

beerRouter.get('/theBeer/:token', async (req, res) => {
  const token = req.params.token;

  try {
    const response = await fetch(
      `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/theBeer/${key}.json?auth=` +
        token,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      const data = await response.json();
      res.send({ error: data.error });
    } else {
      const valueOfBeer = await response.json();
      res.send({ valueOfBeer: valueOfBeer.value });
    }
  } catch (error) {
    return error;
  }
});

beerRouter.patch('/theBeer', async (req, res) => {
  const token = req.body.token;
  const value = req.body.value;
  const beer = {
    value: value,
  };
  try {
    const response = await fetch(
      `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/theBeer/${key}.json?auth=` +
        token,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(beer),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      res.send({ error: data.error });
    } else {
      const valueOfBeer = await response.json();
      res.send({ valueOfBeer: valueOfBeer.value });
    }
  } catch (error) {
    return error;
  }
});

export default beerRouter;
