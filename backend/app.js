import express from 'express';
const app = express();

import cors from 'cors';
app.use(cors());
app.use(express.json());

import authRouter from './routers/authRouter.js';
app.use(authRouter);

import cockRouter from './routers/cocktailRouter.js';
app.use(cockRouter);

import postRouter from './routers/postRouter.js';
app.use(postRouter);

import userRouter from './routers/userRouter.js';
app.use(userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
