const Joi = require('joi')

const replayComment = Joi.object({
    comment_id: Joi.number().required(),
    comment: Joi.string().max(100).required(),
})
const createComment = Joi.object({
    blog_id: Joi.number().required(),
    comment: Joi.string().max(100).required(),
})
module.exports = { replayComment, createComment }
