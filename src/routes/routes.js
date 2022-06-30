
const express = require('express')
const router = express.Router()


const authorController = require('../controller/authorController')
const blogController = require('../controller/blogsController')
const middlewere = require('../middleware/middleware')



router.post('/createUser',authorController.createAuthor)
router.post('/createblog',blogController.createBlog)
router.get('/blogDetails',blogController.blogDetails)
router.put('/updateDetail/:blogId',middlewere,blogController.blogUpdate)
router.delete('/deletedId',middlewere,blogController.deleted)
router.post('/login',authorController.login)


module.exports = router
