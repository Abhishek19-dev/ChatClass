const express = require('express')
const { isAuthenticatedUser } = require('../middleware/authMiddleWare')
const { accessChats, fetchAllChats, createGroupChat } = require('../controllers/chatController')


const router = express.Router()

router.post("/chat",isAuthenticatedUser,accessChats)
router.get("/allChats",isAuthenticatedUser,fetchAllChats)
router.post("/groupChats",isAuthenticatedUser,createGroupChat)
exports.router = router 