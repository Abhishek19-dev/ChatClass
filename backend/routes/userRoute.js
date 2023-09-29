const express = require('express')
const { registerUser, LoginUser, getAllUsers, getSingleUser, Logout, LogoutUser } = require('../controllers/userController')
const { singleUpload } = require('../middleware/multer')
const { isAuthenticatedUser } = require('../middleware/authMiddleWare')
const router = express.Router()

router.post("/user/register",singleUpload,registerUser)
router.post("/user/login",LoginUser)
router.get("/user/logout",isAuthenticatedUser,LogoutUser)
router.get("/allUsers",isAuthenticatedUser,getAllUsers)
router.get("/singleUser",isAuthenticatedUser,getSingleUser)
// router.get("/user/login")

exports.router = router