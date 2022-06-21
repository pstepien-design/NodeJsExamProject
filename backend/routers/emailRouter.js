import { Router } from 'express';
import { resetPassword } from '../authentication/authentication.js';
const emailRouter = Router();

emailRouter.get(`/sendEmail/:email`, async (req, res) => {
  const email = req.params.email;
  const response = await resetPassword(email);
  res.send({ wasSent: response });
});

export default emailRouter;
