const router = require('express').Router()
const { sequelize, comments, blog } = require('../models')
const sendFailedResponse = require('../utils/errorHandler')
const { QueryTypes } = require('@sequelize/core')
const validate = require('../utils/validation')
const { replayComment, createComment } = require('../schema/comments')

router.get('/:id/blog', async (req, res) => {
    let blogId = req.params.id
    if (!Number(blogId) || !blogId) {
        sendFailedResponse(res, 'Invalid blog id')
        return
    }
    let query = `select id,comment,blog_id from comments where blog_id =$blogId and parent_comment_id is null`
    let result = await sequelize.query(query, {
        bind: { blogId },
        type: QueryTypes.SELECT,
    })
    if (!result) {
        sendFailedResponse(res, 'No comments')
        return
    } else {
        res.send({ data: result, message: 'comment list' })
    }
})

router.get('/:id/blog-orm', async (req, res) => {
    let blogId = req.params.id
    if (!Number(blogId) || !blogId) {
        sendFailedResponse(res, 'Invalid blog id')
        return
    }
    let result = await comments.findAll({
        where: { blog_id: blogId, parent_comment_id: null },
        attributes: ['id', 'comment', 'blog_id'],
    })
    if (!result) {
        sendFailedResponse(res, 'No comments')
        return
    } else {
        res.send({ data: result, message: 'comment list' })
    }
})

router.post('/replay', async (req, res) => {
    try {
        validate(req.body, replayComment)
        let comment_details = await comments.findByPk(req.body.comment_id)
        if (!comment_details) {
            sendFailedResponse(res, 'Invalid comment id')
            return
        }
        let response = await comments.create({
            parent_comment_id: req.body.comment_id,
            comment: req.body.comment,
        })
        res.status(201).send({ data: response, message: 'replay created' })
    } catch (error) {
        sendFailedResponse(res, error)
    }
})

router.post('/', async (req, res) => {
    try {
        validate(req.body, createComment)
        let blog_details = await blog.findByPk(req.body.blog_id)
        if (!blog_details) {
            sendFailedResponse(res, 'Invalid blog id')
            return
        }
        let response = await comments.create({
            blog_id: req.body.blog_id,
            comment: req.body.comment,
        })
        res.status(201).send({ data: response, message: 'replay created' })
    } catch (error) {
        sendFailedResponse(res, error)
    }
})

router.get('/:comment_id/replay', async (req, res) => {
    let comment_id = req.params.comment_id
    if (!Number(comment_id) || !comment_id) {
        sendFailedResponse(res, 'Invalid comment id')
        return
    }
    let response = await comments.findAll({
        where: { parent_comment_id: comment_id },
        attributes: ['comment', 'parent_comment_id  '],
    })
    if (!response) {
        sendFailedResponse(res, 'No replays found')
        return
    }
    res.send({ data: response, message: 'Comment replays' })
})

module.exports = router
