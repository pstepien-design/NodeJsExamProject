import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import cors from 'cors';
import session from 'express-session';
// import fetch from 'node-fetch';
const app = express();
app.use(cors());

app.use(express.static(path.resolve('../frontend/public')));
app.use(express.urlencoded({ extended: true }));
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
});
app.use(sessionMiddleware);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
  }
});

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

// const patchBeer = async (value) => {
//   const beer = {
//     value: value,
//   }
//   const key = '-N3zrp2zfL7sjXfFERqB'
//   try {
//     const response = await fetch(
//       `https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/theBeer/${key}.json?auth=` +
//         token,
//       {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(beer),
//       }
//     );

//     if (!response.ok) {
//       console.log(await response.json())

//     } else {
//       const data = await response.json();
//       console.log(data)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }



io.on('connection', (socket) => {
  console.log(socket.id)
  socket.on('beerIncremented', (data) => {
    
    io.emit('incrementBeer', data);
  });
});

app.use(express.json());

import authRouter from './routers/authRouter.js';
app.use(authRouter);

import beerRouter from './routers/beerRouter.js'
app.use(beerRouter)

import cockRouter from './routers/cocktailRouter.js';
app.use(cockRouter);

import postRouter from './routers/postRouter.js';
app.use(postRouter);

import userRouter from './routers/userRouter.js';
app.use(userRouter);

import emailRouter from './routers/emailRouter.js';
app.use(emailRouter);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
