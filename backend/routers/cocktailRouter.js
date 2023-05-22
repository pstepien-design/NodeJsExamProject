import { Router } from "express";
import Cocktail from "../db/schema/cocktail.schema.js";

const cockRouter = Router();

cockRouter.get('/cocktails', async (req, res) => {
  try {
    const cocktails = await Cocktail.find();
    res.send(cocktails);
  } catch (error) {
    console.error("Unable to fetch cocktails", error);
    res.sendStatus(500);
  }
});

cockRouter.get('/cocktails/:key', async (req, res) => {
  const key = req.params.key;

  try {
    const cocktail = await Cocktail.findById(key);
    if (!cocktail) {
      res.send({ data: "Cocktail not found" });
      return;
    }

    res.send({ data: cocktail });
  } catch (error) {
    console.error("Unable to get cocktail", error);
    res.sendStatus(500);
  }
});

cockRouter.post('/cocktails', async (req, res) => {
  const { name, description } = req.body;

  const cocktail = new Cocktail({
    name,
    description,
  });

  try {
    await cocktail.save();
    res.send({ data: cocktail });
  } catch (error) {
    console.error("Something was wrong with the request", error);
    res.sendStatus(500);
  }
});

cockRouter.patch('/cocktails/:key', async (req, res) => {
  const key = req.params.key;
  const { name, description } = req.body;

  try {
    const cocktail = await Cocktail.findById(key);
    if (!cocktail) {
      res.send({ data: "Cocktail not found" });
      return;
    }

    cocktail.name = name;
    cocktail.description = description;
    await cocktail.save();

    res.send({ data: cocktail });
  } catch (error) {
    console.error("Unable to patch cocktail", error);
    res.sendStatus(500);
  }
});

cockRouter.delete('/cocktails/:key', async (req, res) => {
  const key = req.params.key;

  try {
    const cocktail = await Cocktail.findByIdAndDelete(key);
    if (!cocktail) {
      res.send({ data: "Cocktail not found" });
      return;
    }

    res.send({ data: "Cocktail was deleted" });
  } catch (error) {
    console.error("Unable to delete cocktail", error);
    res.sendStatus(500);
  }
});

export default cockRouter;
