import joi from 'joi';

export const postValidator = joi.object({
  title: joi.string().max(150).required(),
  text: joi.string().max(255).required(),
  comments: joi.array().items(joi.string().max(255)),
  likes: joi.array().items(joi.string()),
  postedBy: joi.string().required(),
  userId: joi.string().required(),
  isPrivate: joi.boolean().required(),
});
