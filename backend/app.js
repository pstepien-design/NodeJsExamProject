import express from 'express';
const app = express();

import cors from 'cors';
app.use(cors());
app.use(express.json());

import router from './routers/router.js';
app.use(router);

import cockRouter from './routers/cocktailRouter.js'
app.use(cockRouter)

import postRouter from './routers/postRouter.js'
app.use(postRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
}); 
