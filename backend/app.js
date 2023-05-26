import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import cors from "cors";
import session from "express-session";
import { verifyTokenMiddleware } from "./authentication/verify-token-middleware.js";

import { resetHasClicked } from "./schedules/hasClicked.js";
import { connectToDB } from "./db/connection/connect-to-db.js";

const app = express();

app.use(cors());

app.use(express.static(path.resolve("../frontend/public")));
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
    origin: "http://localhost:8080",
  },
});

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

io.on("connection", (socket) => {
  socket.on("beerIncremented", (data) => {
    io.emit("incrementBeer", data);
  });
});

app.use(express.json());

import authRouter from "./routers/authRouter.js";
app.use(authRouter);

import beerRouter from "./routers/beerRouter.js";
app.use(beerRouter);

import cockRouter from "./routers/cocktailRouter.js";
app.use(cockRouter);

import postRouter from "./routers/postRouter.js";
app.use(postRouter);

import userRouter from "./routers/userRouter.js";
app.use(userRouter);

import emailRouter from "./routers/emailRouter.js";
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
    console.error("Error connecting to MongoDB", error);
  });
