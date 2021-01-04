module.exports = app => {
    const express = require('express')
    const home = require('../controllers/home.controller');
    var router = express.Router();
    router.post('/', home.create);
    router.get('/:id', home.findOne);
    router.get('/', home.findAll);
    router.put('/:id', home.update)
    app.use('/api/home', router);
}