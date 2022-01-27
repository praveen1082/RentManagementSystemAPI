module.exports = app => {
    const userimage = require("../controllers/file.controller");
    var router = require('express').Router();
    router.post("/", userimage.upload);
    router.get("/", userimage.getListFiles);
    router.get("/:userId", userimage.download);
    app.use('/api/image', router);
}