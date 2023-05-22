import { Router } from 'express';
import { resetPassword } from '../authentication/authentication.js';
import sendIncrementEmail from '../service/emailService.js';
const emailRouter = Router();

emailRouter.get('/sendEmail/:email', async (req, res) => {
  const email = req.params.email;
  const response = await resetPassword(email);
  res.send({ wasSent: response });
});

emailRouter.get('/sendEmail/incrementBeer/:email' , async (req, res) => {
  const email = req.params.email;
  const response = await sendIncrementEmail(email)
  res.send({ wasSent: response });
})

export default emailRouter;
