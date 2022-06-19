import { Router } from "express";
import sendEmail from "../service/emailService.js";
const emailRouter = Router();

emailRouter.post("/sendEmail", async (req, res) => {
  const email = req.body.email;
  const response = await sendEmail(email);
  res.send({ wasSent: response });
});

export default emailRouter;
