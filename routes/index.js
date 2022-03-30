const router = require('express').Router()

const { roleChecker } = require('../utils/accessCheck')

const blog = require('./blog.routes')
router.use('/blog', roleChecker, blog)

const comment = require('./comments.routes')
router.use('/comment', roleChecker, comment)

module.exports = router
