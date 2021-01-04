module.exports = app => {
    const renter = require('../controllers/renter.controller');
    var router = require('express').Router();
    router.post('/', renter.create);
    router.get('/', renter.findAll),
        router.get('/:id', renter.findOne)
    router.put('/:id', renter.update)
    app.use('/api/renter', router);
}