import Post from '../entities/Post.js';
import fetch from 'node-fetch';
import { Router } from 'express';
import getCurrentTime from '../service/timeService.js';

const postRouter = Router();

// Posts
postRouter.get('/get/posts/:token', async (req, res) => {
  const token = req.params.token;

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
        new Post(
          key,
          obj.title,
          obj.text,
          obj.timestamp,
          obj.comments,
          obj.likes,
          obj.postedBy
        )
      );
    }
    res.send({ data: posts });
  }
});

postRouter.post('/posts', async (req, res) => {
  const token = req.body.token;
  const comments = [''];
  const likes = [''];
  const title = req.body.title;
  const text = req.body.text;
  const postedBy = req.body.postedBy;
  const randomId = Math.floor(
    Math.random() * Math.floor(Math.random() * Date.now())
  );

  const timestamp = getCurrentTime();
  const post = new Post(
    randomId,
    title,
    text,
    timestamp,
    comments,
    likes,
    postedBy
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
postRouter.get("/posts/:postKey/comments/:commentKey/:token", async (req, res) => {
  const postKey = req.params.postKey;
  const commentKey = req.params.commentKey;
  const token = req.params.token;

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

// get all Comments
postRouter.get("/posts/:key/comments/:token", async (req, res) => {
  const key = req.params.key;
  const token = req.params.token;

  const response = await fetch(
    `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/posts/${key}/comments.json?auth=` +
      token,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    res.send({ data: "Unable to get comments" });
  } else {
    const data = await response.json();
    console.log(data);
    res.send({ data: data });
  }
});

postRouter.post("/posts/:key/comments", async (req, res) => {
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
    res.send({ data: data.name });
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
      console.log(await response.json());
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

// Likes
postRouter.get('/posts/:postKey/likes/:token', async (req, res) => {
  const postKey = req.params.postKey;
  const token = req.params.token;
  // console.log(postkey)
  const response = await fetch(
    `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/posts/${postKey}/likes.json?auth=` +
      token,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    console.log('why')
  } else {
    let likes = []
    const data = await response.json();
    for (let key in data) {
      likes.push(data[key])
    }
    res.send(likes)
  }
})

postRouter.post('/posts/:postKey/likes', async (req, res) => {
  const postKey = req.params.postKey;
  const userId = req.body.userId;
  const token = req.body.token;
  const like = {
    userId: userId,
  };
  const response = await fetch(
    `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/posts/${postKey}/likes.json?auth=` +
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
    const likes = await response.json();
    for (const key in likes) {
      if (like.userId == likes[key].userId) {
        res.send('User already liked this post');
        return;
  
      } else {
        const response2 = await fetch(
          `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/posts/${postKey}/likes.json?auth=` +
            token,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(like),
          }
        );

        if (!response2.ok) {
          res.send('Unable to add like');
        } else {
          res.send(like);
        }
      }
    }
  }
});

export default postRouter;
