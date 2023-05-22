import { Router } from "express";
import User from "../db/schema/user.schema.js";

const userRouter = Router();

userRouter.get("/users/name/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({ id: id });
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

userRouter.patch("/users/name/:id/", async (req, res) => {
  const hasClicked = req.body.hasClicked;
  const id = req.params.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  try {
    const user = await User.findOne({ id: id });
    if (!user) {
      res.send({ data: "User not found" });
      return;
    }

    user.hasClicked = hasClicked || false;
    user.firstName = firstName;
    user.lastName = lastName;

    console.log("userToUpdate", user);
    await user.save();

    res.send(user);
  } catch (error) {
    console.error("Unable to update user", error);
    res.sendStatus(500);
  }
});

export default userRouter;
