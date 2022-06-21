import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config({ path: './.env' });
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const options = {
  from: process.env.EMAIL_USER,
  to: '',
  subject: 'Beer incrementing!',
  html: '',
};

const sendIncrementEmail = async (email) => {
  options.html = fs.readFileSync('./email/email.html').toString();
  options.to = email;
  return new Promise((resolve) => {
    transporter.sendMail(options, function (err) {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

export default sendIncrementEmail;
