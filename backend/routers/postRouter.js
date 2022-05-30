import Post from '../entities/Post.js';
import fetch from 'node-fetch';
import { Router } from 'express';

const postRouter = Router();

postRouter.post('/posts', async (req, res) => {
  const comments = [''];
  const likes = ['']
  const timestamp = Date.now()
  const post = new Post(req.body.title, req.body.text, new Date(timestamp), comments, likes);
  const token = req.body.token;

  const response = await fetch(
    'https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/posts.json?auth=' +
      token,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    }
  );

  if (!response.ok) {
    res.send('Something was wrong with the request');
  } else {
    const data = await response.json();

    // Creating an object in the database should return a unique name (id)
    if (data.name !== undefined) {
      res.send({ data: post });
    } else {
      res.send({ data: 'Unable to create post in the database' });
    }
  }
});


export default postRouter;