import joi from 'joi';

// Validate the cocktail data to protect against injections or 
export const cocktailValidator = joi.object({
  description: joi.string().max(255).required(),
  image: joi.string().required(),
  name: joi.string().max(100).required(),
});
