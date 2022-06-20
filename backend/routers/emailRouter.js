import { Router } from "express";
import { resetPassword } from "../authentication/authentication.js";
const emailRouter = Router();

emailRouter.post("/sendEmail", async (req, res) => {
  const email = req.body.email;
  const response = await resetPassword(email);
  console.log(response);
  res.send({ wasSent: response });
});

export default emailRouter;
