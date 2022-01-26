const util = require("util");
const multer = require("multer");
var path = require("path");
const res = require("express/lib/response");
const maxSize = 2 * 1024 * 1024;
var namecontainer;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/resources/static/assets/uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        // var userId = req.params.userId;
        // if (!userId) {
        //     res.status(400).send({ code: 400, message: "User Id is required to upload an image" })
        // }
        var name = Date.now();
        cb(null, file.originalname);
    },
});
// const maxSize = 2 * 1024 * 1024;
let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;