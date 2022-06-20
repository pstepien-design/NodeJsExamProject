import { Router } from "express";
import { resetPassword } from "../authentication/authentication.js";
const emailRouter = Router();

emailRouter.post(`/sendEmail/:email`, async (req, res) => {
  const email = req.params.email;
  const response = await resetPassword(email);
  console.log(response);
  res.send({ wasSent: response });
});

export default emailRouter;
