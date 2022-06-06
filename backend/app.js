import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import cors from 'cors';
import session from 'express-session';
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
  socket.on('colorChanged', (data) => {
    io.emit('changeTheColor', data);
  });
});

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
server.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
