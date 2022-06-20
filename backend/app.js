import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import cors from 'cors';
import session from 'express-session';
import { resetHasClicked } from './schedules/hasClicked.js'
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

<<<<<<< HEAD
// Resets hasClicked everyday at midnight European/Copenhagen
resetHasClicked()
=======
import emailRouter from './routers/emailRouter.js';
app.use(emailRouter);

>>>>>>> 896e6b2ed6dcc9d3ce441da170409b3559233552

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
