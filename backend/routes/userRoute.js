const express = require('express')
const { registerUser, LoginUser } = require('../controllers/userController')
const router = express.Router()

router.post("/user/register",registerUser)
router.post("/user/login",LoginUser)
// router.get("/user/login")

exports.router = router