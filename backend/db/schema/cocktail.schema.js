import mongoose from "mongoose";

const cocktailSchema = new mongoose.Schema({
  description: String,
  image: String,
  name: String,
});

const Cocktail = mongoose.model("Cocktails", cocktailSchema);

export default Cocktail;
