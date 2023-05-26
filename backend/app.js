import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';

import { resetHasClicked } from './schedules/hasClicked.js';
import { connectToDB } from './db/connection/connect-to-db.js';

const app = express();

// Setting content security policy to restrict execution of scripts to prevent XSS attacks
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
    },
  })
);

// Checking origin and referer headers to prevent CSRF attacks
const checkOriginAndRefererHeaders = (req, res, next) => {
  if (req.method === 'POST') {
    const origin = req.headers.origin;
    const referer = req.headers.referer;

    if (origin && referer !== 'http://localhost:8080/') {
      return res.status(403).json({ error: 'Invalid Origin header' });
    }
  }
  next();
};

app.use(checkOriginAndRefererHeaders);
app.use(cors());

app.use(express.static(path.resolve('../frontend/public')));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
import postRouter from './routers/postRouter.js';
app.use(postRouter);

import authRouter from './routers/authRouter.js';
app.use(authRouter);

import beerRouter from './routers/beerRouter.js';
app.use(beerRouter);

import cockRouter from './routers/cocktailRouter.js';
app.use(cockRouter);

import userRouter from './routers/userRouter.js';
app.use(userRouter);

import emailRouter from './routers/emailRouter.js';
app.use(emailRouter);

// Resets hasClicked everyday at midnight European/Copenhagen
resetHasClicked();

const PORT = process.env.PORT || 3000;

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });
