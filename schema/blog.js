const Joi = require('joi')

const createBlog = Joi.object({
    title: Joi.string().max(50).required(),
    body: Joi.string().required(),
})
const patchBlog = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().max(50),
    body: Joi.string(),
})
module.exports = { createBlog, patchBlog }
