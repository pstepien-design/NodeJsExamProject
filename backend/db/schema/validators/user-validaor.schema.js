import joi from 'joi';

export const userValidator = joi.object({
  id: joi.string().required(),
  email: joi.string().email().required(),
  firstName: joi.string().min(2).max(50).required(),
  lastName: joi.string().min(2).max(50).required(),
  hasClicked: joi.boolean().required(),
});
