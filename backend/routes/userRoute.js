const express = require('express')
const { registerUser, LoginUser, getAllUsers, getSingleUser, Logout, LogoutUser, editDescriptionUser, editProfile, getUserDetails } = require('../controllers/userController')
const { singleUpload } = require('../middleware/multer')
const { isAuthenticatedUser } = require('../middleware/authMiddleWare')
const router = express.Router()

router.post("/user/register",singleUpload,registerUser)
router.post("/user/login",LoginUser)
router.get("/user/logout",isAuthenticatedUser,LogoutUser)
router.get("/allUsers",isAuthenticatedUser,getAllUsers)
router.get("/getUserDetails",isAuthenticatedUser,getUserDetails)
router.get("/singleUser",isAuthenticatedUser,getSingleUser)
router.put("/editDescription",isAuthenticatedUser,editDescriptionUser)
router.put("/editProfile",isAuthenticatedUser,editProfile)
// router.get("/user/login")

exports.router = router