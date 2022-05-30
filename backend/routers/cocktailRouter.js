import Cocktail from '../entities/Cocktail.js'
import fetch from 'node-fetch';
import { Router } from 'express';
const cockRouter = Router();

cockRouter.post('/cocktails', async (req, res) => {
    const cocktail = new Cocktail(req.body.name, req.body.desc);
    const token = req.body.token;
    const response = await fetch(
        'https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/cocktails.json?auth=' +
          token,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cocktail),
        }
      );

      if(!response.ok) {
          res.send("Something was wrong with the request");
      } else {
          const data = await response.json();

          if (data.name !== undefined) {
            res.send({data: cocktail});
          }
      }

})

export default cockRouter;