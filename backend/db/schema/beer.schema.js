import mongoose from 'mongoose';

const beerSchema = new mongoose.Schema({
  value: Number,
});

const Beer = mongoose.model('Beer', beerSchema);

export default Beer;
