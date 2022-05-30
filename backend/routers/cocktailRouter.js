import Cocktail from '../entities/Cocktail.js';
import fetch from 'node-fetch';
import { Router } from 'express';
const cockRouter = Router();

cockRouter.get('/cocktails', async (req, res) => {
  const token = req.body.token;

  const response = await fetch(
    'https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/cocktails.json?auth=' +
      token,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    res.send('Unable to fetch cocktails');
  } else {
    const data = await response.json();
    let cocktails = [];
    for (const key in data) {
      const obj = data[key];
      cocktails.push(new Cocktail(obj.name, obj.description));
    }
    res.send({ data: cocktails });
  }
});

cockRouter.get('/cocktails/:key', async (req, res) => {
  const token = req.body.token;
  const key = req.params.key;

  const response = await fetch(
    `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/cocktails/${key}/.json?auth=` +
      token,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    res.send({data: "Unable to get cocktail"})
  } else {
    const data = await response.json();
    res.send({data: data})
  }
});

cockRouter.post('/cocktails', async (req, res) => {
  const cocktail = new Cocktail(req.body.name, req.body.desc);
  const token = req.body.token;

  const response = await fetch(
    'https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/cocktails.json?auth=' +
      token,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cocktail),
    }
  );

  if (!response.ok) {
    res.send('Something was wrong with the request');
  } else {
    const data = await response.json();

    // Creating an object in the database should return a unique name (id)
    if (data.name !== undefined) {
      res.send({ data: cocktail });
    } else {
      res.send({ data: 'Unable to create cocktail in the database' });
    }
  }
});

cockRouter.patch('/cocktails/:key', async (req, res) => {
  const cocktail = new Cocktail(req.body.name, req.body.desc);
  const key = req.params.key;
  const token = req.body.token;

  const response = await fetch(
    `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/cocktails/${key}/.json?auth=` +
      token,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cocktail),
    }
  );

  if (!response.ok) {
    res.send({data: 'Unable to patch cocktail'});
  } else {
    const data = await response.json();
    res.send({data: data});
  }
});

cockRouter.delete('/cocktails/:key', async (req, res) => {
  const key = req.params.key;
  const token = req.body.token;

  const response = await fetch(
    `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/cocktails/${key}/.json?auth=` +
      token,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    res.send({data: 'Unable to delete cocktail'})
  } else {
    const data = await response.json();
    console.log(data)
    res.send({data: "Cocktail was deleted"})
  }
})

export default cockRouter;
