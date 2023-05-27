import { Router } from "express";

import { verifyTokenMiddleware } from "../authentication/verify-token-middleware.js";
import Post from "../db/schema/post.schema.js";
import { postValidator } from "../db/schema/validators/post-validator.schema.js";

const postRouter = Router();

postRouter.use(verifyTokenMiddleware);

// Posts
postRouter.get("/get/posts", async (req, res) => {
  try {
    const id = res.locals.userId;
    if (id === process.env.ADMIN_ID) {
      const posts = await Post.find();
      res.send({ data: posts });
    } else {
      const posts = await Post.find({
        $or: [{ isPrivate: false }, { userId: id }],
      });

      res.send({ data: posts });
    }
  } catch (error) {
    console.error("Unable to fetch posts", error);
    res.sendStatus(500);
  }
});

postRouter.get("/posts/:key", async (req, res) => {
  const key = req.params.key;
  try {
    const post = await Post.findById(key);
    if (!post) {
      res.send({ data: "Post not found" });
      return;
    }

    res.send({ data: post });
  } catch (error) {
    console.error("Unable to fetch posts", error);
    res.sendStatus(500);
  }
});

postRouter.post("/posts", async (req, res) => {
  const { title, text, postedBy, isPrivate, userId } = req.body;
  const timestamp = new Date();
  const comments = [];
  const likes = [];
  const { error } = postValidator.validate(req.body);

  // if (error) {
  //   console.log(error);
  //   return res.send({ error: 'Invalid post body' });
  // }
  const post = new Post({
    title,
    text,
    timestamp,
    comments,
    likes,
    postedBy,
    isPrivate,
    userId,
  });

  try {
    await post.save();
    res.send({ data: post });
  } catch (error) {
    console.error("Something was wrong with the request", error);
    res.sendStatus(500);
  }
});

postRouter.patch("/posts/:key", async (req, res) => {
  const key = req.params.key;
  const { title, text } = req.body;

  try {
    const post = await Post.findById(key);
    if (!post) {
      res.send({ data: "Post not found" });
      return;
    }

    post.title = title;
    post.text = text;
    await post.save();

    res.send({ data: post });
  } catch (error) {
    console.error("Unable to patch post", error);
    res.sendStatus(500);
  }
});

postRouter.patch("/posts/:key/comments", async (req, res) => {
  const key = req.params.key;
  const { comment } = req.body;

  try {
    const post = await Post.findById(key);
    if (!post) {
      res.send({ data: "Post not found" });
      return;
    }

    post.comments.push(comment);
    await post.save();

    res.send({ data: post });
  } catch (error) {
    console.error("Unable to patch post", error);
    res.sendStatus(500);
  }
});

postRouter.delete("/posts/:key", async (req, res) => {
  const key = req.params.key;

  try {
    const post = await Post.findByIdAndDelete(key);
    if (!post) {
      res.send({ data: "Post not found" });
      return;
    }

    res.send({ data: "Post was deleted" });
  } catch (error) {
    console.error("Unable to delete post", error);
    res.sendStatus(500);
  }
});

export default postRouter;
