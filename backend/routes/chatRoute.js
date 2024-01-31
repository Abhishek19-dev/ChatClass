const express = require('express')
const { isAuthenticatedUser } = require('../middleware/authMiddleWare')
const { accessChats, fetchAllChats, createGroupChat, renameGroup, addToGroup, removeFromGroup, searchGroup, joinGroupChat, leaveAGroup, joinGroup} = require('../controllers/chatController')


const router = express.Router()

router.post("/chat",isAuthenticatedUser,accessChats)
router.get("/allChats",isAuthenticatedUser,fetchAllChats)
router.post("/groupChats",isAuthenticatedUser,createGroupChat)
router.put("/renameGroup",isAuthenticatedUser,renameGroup)
router.put("/addToGroup",isAuthenticatedUser,addToGroup)
router.put("/removeFromGroup",isAuthenticatedUser,removeFromGroup)
router.post("/searchGroup",isAuthenticatedUser,searchGroup)
// router.post("/joinGroup",isAuthenticatedUser,joinGroupChat)
router.put("/joinGroup",isAuthenticatedUser,joinGroup)
router.put("/leaveGroup",isAuthenticatedUser,leaveAGroup)

exports.router = router 