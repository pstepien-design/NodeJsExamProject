import express from "express";

import Beer from "../db/schema/beer.schema.js";
import { verifyTokenMiddleware } from "../authentication/verify-token-middleware.js";

const beerRouter = express.Router();

beerRouter.use(verifyTokenMiddleware);

beerRouter.get("/theBeer", async (req, res) => {
  try {
    const beer = await Beer.findOne();
    if (!beer) {
      res.send({ error: "Beer not found" });
      return;
    }

    res.send({ valueOfBeer: beer.value });
  } catch (error) {
    console.error("Unable to get the beer", error);
    res.sendStatus(500);
  }
});

beerRouter.patch("/theBeer", async (req, res) => {
  const value = req.body.value;

  try {
    const beer = await Beer.findOne();
    if (!beer) {
      const newBeer = new Beer({ value });
      await newBeer.save();
      res.send({ valueOfBeer: newBeer.value });
    } else {
      beer.value = value;
      await beer.save();
      res.send({ valueOfBeer: beer.value });
    }
  } catch (error) {
    console.error("Unable to update the beer", error);
    res.sendStatus(500);
  }
});

export default beerRouter;
