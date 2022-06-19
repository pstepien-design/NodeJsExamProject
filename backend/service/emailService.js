import nodemailer from "nodemailer";
import dotenv from "dotenv";
import * as fs from 'fs';

dotenv.config({ path: "./.env" });
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const options = {
  from: process.env.EMAIL_USER,
  to: "",
  subject: "Reset the password",
  html: "",
};

const sendEmail = async (email) => {
  const link = getLink();
  console.log(link)
  let html = fs.readFileSync("./email/email.html").toString(); 
  options.to = email;
  options.html = html.replace('<a>link</a>', `<a>${link}</a>`);
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

const getLink = () => {
  return 'somelinktobereplaced'
 /*  getAuth()
    .generatePasswordResetLink(userEmail, actionCodeSettings)
    .then((link) => {
      return sendCustomPasswordResetEmail(userEmail, displayName, link);
    })
    .catch((error) => {
      // Some error occurred.
    }); */
};

export default sendEmail;
