import joi from 'joi';

export const cocktailValidator = joi.object({
  description: joi.string().required(),
  image: joi.string().required(),
  name: joi.string().required(),
});
