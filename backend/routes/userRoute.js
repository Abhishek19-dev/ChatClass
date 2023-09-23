const express = require('express')
const { registerUser } = require('../controllers/userController')
const router = express.Router()

router.post("/user/register",registerUser)
// router.get("/user/login")

exports.router = router