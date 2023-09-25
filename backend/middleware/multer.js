const multer = require("multer")

const storage = multer.memoryStorage()



//for single Uploads:-
const singleUpload = multer({storage,limits:{fileSize:1024 * 1024}}).single("file")

module.exports = {
    singleUpload: singleUpload,
};