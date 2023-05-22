import { Router } from "express";
import User from "../db/schema/user.schema.js";
import {
  login,
  signup,
  refreshAuthToken,
  verifyToken,
} from "../authentication/authentication.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
const authRouter = Router();

authRouter.post("/auth/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const response = await signup(email, password);

  try {
    if (response) {
      const hasClicked = false;
      const user = new User({
        email,
        firstName,
        lastName,
        id: response.localId,
        hasClicked,
      });

      try {
        await user.save();
        res.send({ accessToken: response.idToken, id: response.localId });
      } catch (error) {
        res.status(500).send({ error: "Unable to create user" });
      }
    }
  } catch (error) {
    res.send(error);
  }
});

authRouter.post("/auth/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const response = await login(email, password);

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.send({
        accessToken: response.idToken,
        refreshToken: response.refreshToken,
        id: user.id,
      });
    } else {
      res.status(401).send({ error: "User not found" });
    }
  } catch (error) {
    res.send(error);
  }
});

authRouter.post("/auth/refreshToken", async (req, res) => {
  const refreshToken = req.body.refreshToken;

  try {
    const response = await refreshAuthToken(refreshToken);

    if (response.access_token !== undefined) {
      res.send({
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      });
    } else {
      res.status(response.error.code).send(response);
    }
  } catch (error) {
    res.send(error);
  }
});

authRouter.post("/auth/verifyToken", async (req, res) => {
  const token = req.body.accessToken;
  try {
    const response = await verifyToken(token);
    if (!response.error) {
      res.send(response);
    } else {
      res.status(response.error.code).send(response);
    }
  } catch (error) {
    res.send(error);
  }
});

export default authRouter;
