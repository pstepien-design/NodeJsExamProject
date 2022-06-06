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
const sessionMiddelware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
});
app.use(sessionMiddelware);

const server = http.createServer(app);
const options = {
  cors: true,
  origins: ['http://127.0.0.1:3000'],
};

const io = new Server(server, options);

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
io.use(wrap(sessionMiddelware));

io.on('connection', (socket) => {
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
