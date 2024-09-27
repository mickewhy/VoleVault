const express = require('express')
const router = express.Router()
const {
    loginUser,
    signupUser,
    // refreshUser
} = require('../controllers/userController')
const loginLimiter = require('../middleware/loginLimiter')

router.post('/', loginLimiter)
router.post('/login', loginUser)
router.post('/signup', signupUser)
// router.post('/refresh', refreshUser)

module.exports = router