import { Router } from 'express';
import Cocktail from '../db/schema/cocktail.schema.js';
import { verifyTokenMiddleware } from '../authentication/verify-token-middleware.js';
import { cocktailValidator } from '../db/schema/validators/cocktail-validator.schema.js';

const cockRouter = Router();

cockRouter.use(verifyTokenMiddleware);

cockRouter.get('/cocktails', async (req, res) => {
  try {
    const cocktails = await Cocktail.find();
    res.send(cocktails);
  } catch (error) {
    console.error('Unable to fetch cocktails', error);
    res.sendStatus(500);
  }
});

// cockRouter.get('/cocktails/:key', async (req, res) => {
//   const key = req.params.key;

//   try {
//     const cocktail = await Cocktail.findOne(key);
//     if (!cocktail) {
//       res.send({ data: "Cocktail not found" });
//       return;
//     }

//     res.send({ data: cocktail });
//   } catch (error) {
//     console.error("Unable to get cocktail", error);
//     res.sendStatus(500);
//   }
// });

cockRouter.post('/cocktails', async (req, res) => {
  const { name, description } = req.body;

  // Validate the request body using cocktailValidator
  const { error } = cocktailValidator.validate(req.body);

  if (error) {
    res.send({ error: 'Invalid cocktail body' });
  }

  const cocktail = new Cocktail({
    name,
    description,
  });

  try {
    await cocktail.save();
    res.send({ data: cocktail });
  } catch (error) {
    console.error('Something was wrong with the request', error);
    res.sendStatus(500);
  }
});

cockRouter.patch('/cocktails/:id', async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;

  try {
    const cocktail = await Cocktail.findById(id);
    if (!cocktail) {
      res.send({ data: 'Cocktail not found' });
      return;
    }

    cocktail.name = name;
    cocktail.description = description;
    await cocktail.save();

    res.send({ data: cocktail });
  } catch (error) {
    console.error('Unable to patch cocktail', error);
    res.sendStatus(500);
  }
});

cockRouter.delete('/cocktails/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const cocktail = await Cocktail.findByIdAndDelete(id);
    if (!cocktail) {
      res.send({ data: 'Cocktail not found' });
      return;
    }

    res.send({ data: 'Cocktail was deleted' });
  } catch (error) {
    console.error('Unable to delete cocktail', error);
    res.sendStatus(500);
  }
});

export default cockRouter;
