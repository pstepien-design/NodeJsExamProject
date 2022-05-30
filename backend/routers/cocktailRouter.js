import Cocktail from '../entities/Cocktail.js'
import fetch from 'node-fetch';
import { Router } from 'express';
const cockRouter = Router();

cockRouter.get('/cocktails', async (req, res) => {
    const token = req.body.token;
    const response = await fetch(
        'https://nodejs-examproject-default-rtdb.europe-west1.firebasedatabase.app/cocktails.json?auth=' +
          token,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if(!response.ok) {
        res.send("Something was wrong with the request");
    } else {
        const data = await response.json();
        let cocktails = [];
        for (const key in data) {
            const obj = data[key];
            cocktails.push(new Cocktail(obj.name, obj.description))
        }
        res.send({data: cocktails})
    }
})

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

          // Creating an object in the database should return a unique name (id)
          if (data.name !== undefined) {
            res.send({data: cocktail});
          } else {
              res.send({data: "Unable to create object in the database"})
          }
      }

})

export default cockRouter;