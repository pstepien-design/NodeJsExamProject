import joi from "joi";

export const postValidator = joi.object({
  title: joi.string().required(),
  text: joi.string().required(),
  comments: joi.array().items(joi.string()),
  likes: joi.array().items(joi.string()),
  postedBy: joi.string().required(),
});
