module.exports = app => {
    const renter = require('../controllers/renter.controller');
    var router = require('express').Router();
    router.post('/', renter.create);
    app.use('/api/renter', router);
}