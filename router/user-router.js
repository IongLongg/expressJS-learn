const express = require('express')
const router = express.Router()
const multer = require('multer')

const upload = multer({dest : './public/uploads/'})

const controller = require('../controllers/users-controller')
const validator = require('../validator/postCreate')
const authMiddleware = require('../middleware/auth-middleware')

router.get('/',authMiddleware.requireAuth, controller.index)

router.get('/cookie', function(req, res, next) {
    res.cookie('user-id', 12345)
    res.send('heloo')
})

router.get('/search', controller.search)

router.get('/create', controller.renderCreate)

router.get('/:id', controller.viewUser)

router.post('/create', 
    upload.single('avatar'),
    validator.postCreate, 
    controller.createUser
)
module.exports = router;