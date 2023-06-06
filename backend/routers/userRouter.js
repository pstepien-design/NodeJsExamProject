import { Router } from "express";
import fs from "fs";
import { opendirSync } from "fs";

import { upload, handleMulterError } from "../multer/multer.js";
import { verifyTokenMiddleware } from "../authentication/verify-token-middleware.js";
import User from "../db/schema/user.schema.js";

const userRouter = Router();

userRouter.use(verifyTokenMiddleware);

userRouter.post(
  "/users/upload-pb",
  upload.single("profilePicture"),
  handleMulterError,
  (req, res) => {
    res.send("Profile picture uploaded");
  }
);

userRouter.get("/users/profile", async (req, res) => {
  try {
    const userId = res.locals.userId;

    const dir = opendirSync("./uploads");

    for await (const entry of dir) {
      if (entry.name === userId + ".png") {
        const image = fs.readFileSync("./uploads/" + userId + ".png");
        res.write(image);
      } else if (entry.name === userId + ".jpg") {
        const image = fs.readFileSync("./uploads/" + userId + ".jpg");
        res.write(image);
      }
    }
    res.end();
  } catch (error) {
    console.error("Unable to fetch the image", error);
    res.sendStatus(500);
  }
});

userRouter.get("/users/name", async (req, res) => {
  const userId = res.locals.userId;

  try {
    const user = await User.findOne({ id: userId });
    if (!user) {
      res.send({ loggedUser: null });
      return;
    }

    res.send({ loggedUser: user });
  } catch (error) {
    console.error("Unable to fetch user", error);
    res.sendStatus(500);
  }
});

userRouter.patch("/users/name", async (req, res) => {
  const hasClicked = req.body.hasClicked;
  const userId = res.locals.userId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  try {
    const user = await User.findOne({ id: userId });
    if (!user) {
      res.send({ data: "User not found" });
      return;
    }

    user.hasClicked = hasClicked || false;
    user.firstName = firstName;
    user.lastName = lastName;

    await user.save();

    res.send(user);
  } catch (error) {
    console.error("Unable to update user", error);
    res.sendStatus(500);
  }
});

export default userRouter;
