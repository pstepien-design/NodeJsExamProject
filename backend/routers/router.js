import { Router } from 'express';
import jwt from 'jsonwebtoken';
import {login, authenticateToke, signup} from '../authentication/authentication.js';
import dotenv from 'dotenv';
dotenv.config({path: './.env'});
const router = Router();


router.post('/auth/signup', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = {email: '' , isAuthorized: false}
  const response =  await signup(email, password);
   if(response){
     user.email=email;
     user.isAuthorized = true;
     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET) 
     console.log('singed up') 
     res.send({ 'accessToken': accessToken }); 
    }
    else{
      res.send({ 'accessToken': false });
    } 
  });



router.post('/auth/login', async (req, res) => {
const email = req.body.email;
const password = req.body.password;
const user = {email: '' , isAuthorized: false}
const response =  await login(email, password);
 if(response){
   user.email=email;
   user.isAuthorized = true;
   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)  
   console.log('logged in')
   res.send({ 'accessToken': accessToken }); 
  }
  else{
    res.send({ 'accessToken': false });
  } 
});


router.post('/auth/authenticateToken', (req, res) => {
  const token = req.body.userToken;
  const response = authenticateToke(token);
 res.send({'isAuthorized': response});
  });
 
export default router;