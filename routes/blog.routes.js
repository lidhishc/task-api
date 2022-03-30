const router = require('express').Router()
const { createBlog, patchBlog } = require('../schema/blog')
const sendFailedResponse = require('../utils/errorHandler')
const validate = require('../utils/validation')
const { blog, sequelize } = require('../models')
const { isAdminCheck } = require('../utils/accessCheck')

// listing all blogs
router.get('/list', async (req, res) => {
    try {
        let roleId = req.headers['roleid']
        let limit = ''
        let bodySelect = `body`
        if (Number(roleId) == 2) {
            limit = ` limit 5 `
            bodySelect = `substring(body,1,100) body `
        }
        let query = `SELECT id,title,date_time,${bodySelect} FROM blogs order by date_time desc ${limit} `

        let result = await sequelize.query(query)
        res.send({ data: result[0], message: 'blogs list' })
    } catch (error) {
        sendFailedResponse(res, error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        let blog_id = req.params.id
        if (!Number(blog_id)) {
            sendFailedResponse(res, 'Invalid blog id')
            return
        }
        let result = await blog.findByPk(blog_id, {
            attributes: ['title', 'body', 'date_time'],
        })
        if (!result) {
            sendFailedResponse(res, 'No record found')
            return
        }
        res.send({ data: result, message: 'Blog details' })
    } catch (error) {
        sendFailedResponse(res, error)
    }
})

router.post('/', isAdminCheck, async (req, res) => {
    try {
        validate(req.body, createBlog, res)
        let response = await blog.create(req.body)
        res.status(201).send({ data: response, message: 'Blog created' })
    } catch (error) {
        sendFailedResponse(res, error)
    }
})

router.patch('/:blog_id', isAdminCheck, async (req, res) => {
    try {
        let blog_id = req.params.blog_id
        validate({ ...req.body, id: blog_id }, patchBlog)
        await blog.update(req.body, {
            where: { id: blog_id },
        })
        res.json({ message: 'Blog updated' })
    } catch (error) {
        sendFailedResponse(res, error)
    }
})

router.delete('/:blog_id', isAdminCheck, async (req, res) => {
    try {
        let blog_id = req.params.blog_id
        if (!Number(blog_id)) {
            sendFailedResponse(res, 'Blog id is not provided')
            return
        }
        let blogDetails = await blog.findByPk(blog_id, {
            attributes: ['title', 'body', 'date_time'],
        })
        if (!blogDetails) {
            sendFailedResponse(res, 'Blog is not presented')
            return
        }

        await blog.destroy({
            where: { id: blog_id },
            returning: true,
        })

        res.json({
            message: 'Blog has been deleted',
        })
    } catch (error) {
        sendFailedResponse(res, error)
    }
})

module.exports = router
