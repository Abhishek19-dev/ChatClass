const express = require('express')
const { isAuthenticatedUser } = require('../middleware/authMiddleWare')
const { sendMessage, allMessages } = require('../controllers/messageController')

const router = express.Router()

router.post("/message/send",isAuthenticatedUser , sendMessage)
router.get("/message/:id" , isAuthenticatedUser , allMessages)

exports.router = router 