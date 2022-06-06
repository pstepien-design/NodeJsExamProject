import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
const app = express();
const server = http.createServer(app);
const io = new Server(server);

import session from 'express-session';
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })

app.use(sessionMiddleware)
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)
io.use(wrap(sessionMiddleware))

io.on("connection", (socket) => {
  socket.on("colorChanged", (data) => {
    const firstName = socket.request.session.firstName;
    io.emit("changeColor", {data, firstName})
  })
})

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
