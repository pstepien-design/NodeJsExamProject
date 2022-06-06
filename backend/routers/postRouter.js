import Post from '../entities/Post.js';
import fetch from 'node-fetch';
import { Router } from 'express';

const postRouter = Router();

// Posts
postRouter.get('/posts', async (req, res) => {
  const token = req.body.token;

  const response = await fetch(
    'https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/posts.json?auth=' +
      token,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    res.send('Unable to fetch posts');
  } else {
    const data = await response.json();
    let posts = [];

    for (const key in data) {
      const obj = data[key];
      posts.push(
        new Post(obj.title, obj.text, obj.timestamp, obj.comments, obj.likes)
      );
    }
    res.send({ data: posts });
  }
});

postRouter.get('/posts/:key', async (req, res) => {
  const token = req.body.token;
  const key = req.params.key;

  const response = await fetch(
    `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/posts/${key}/.json?auth=` +
      token,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    res.send({ data: 'Unable to get post' });
  } else {
    const data = await response.json();
    res.send({ data: data });
  }
});

postRouter.post('/posts', async (req, res) => {
  const token = req.body.token;
  const comments = [''];
  const likes = [''];
  const timestamp = Date.now();
  const post = new Post(
    req.body.title,
    req.body.text,
    new Date(timestamp),
    comments,
    likes
  );

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

postRouter.patch('/posts/:key', async (req, res) => {
  const key = req.params.key;
  const token = req.body.token;

  // Do not initialize new post from entity, because user cannot be allowed to edit anything but title and text"
  const editedPost = {
    title: req.body.title,
    text: req.body.text,
  };

  const response = await fetch(
    `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/posts/${key}/.json?auth=` +
      token,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedPost),
    }
  );

  if (!response.ok) {
    res.send({ data: 'Unable to patch post' });
  } else {
    const data = await response.json();
    res.send({ data: data });
  }
});

postRouter.delete('/posts/:key', async (req, res) => {
  const key = req.params.key;
  const token = req.body.token;

  const response = await fetch(
    `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/posts/${key}/.json?auth=` +
      token,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    res.send({ data: 'Unable to delete post' });
  } else {
    const data = await response.json();
    res.send({ data: 'Post was deleted' });
  }
});

// Comments
postRouter.get('/posts/:postKey/comments/:commentKey', async (req, res) => {
  const postKey = req.params.postKey;
  const commentKey = req.params.commentKey;
  const token = req.body.token;

  const response = await fetch(
    `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/posts/${postKey}/comments/${commentKey}.json?auth=` +
      token,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    res.send({ data: 'Unable to get comment' });
  } else {
    const data = await response.json();
    res.send({ data: data });
  }
});

postRouter.post('/posts/:key/comments', async (req, res) => {
  const key = req.params.key;
  const token = req.body.token;
  const comment = req.body.comment;

  const response = await fetch(
    `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/posts/${key}/comments.json?auth=` +
      token,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    }
  );

  if (!response.ok) {
    res.send({ data: 'Unable to add comment' });
  } else {
    const data = await response.json();
    res.send({ data: comment });
  }
});

postRouter.patch('/posts/:postKey/comments/:commentKey', async (req, res) => {
  const postKey = req.params.postKey;
  const commentKey = req.params.commentKey;
  const token = req.body.token;
  const editedComment = req.body.comment;
  try {
    const response = await fetch(
      `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/posts/${postKey}/.json?auth=` +
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
      res.send(data);

    } else {
      const post = await response.json();
      for (const key in post.comments) {
        if (commentKey == key) {
          post.comments[key] = editedComment;

          const response2 = await fetch(
            `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/posts/${postKey}/.json?auth=` +
              token,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(post),
            }
          );

          if (!response2.ok) {
            res.send('something went wrong');

          } else {
            res.send({ data: post });
          }
        }
      }
    }
  } catch (error) {
    res.send(error);
  }
});

export default postRouter;
