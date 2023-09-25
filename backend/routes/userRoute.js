const express = require('express')
const { registerUser, LoginUser } = require('../controllers/userController')
const { singleUpload } = require('../middleware/multer')
const router = express.Router()

router.post("/user/register",singleUpload,registerUser)
router.post("/user/login",LoginUser)
// router.get("/user/login")

exports.router = router