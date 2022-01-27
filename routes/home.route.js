module.exports = app => {
    const express = require('express')
    const home = require('../controllers/home.controller');
    var router = express.Router();
    router.post('/', home.create);
    app.use('/api/home', router);
}