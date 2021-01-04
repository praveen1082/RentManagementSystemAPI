module.exports = app => {
    const bill = require('../controllers/bill.controller');
    var router = require('express').Router();
    router.post('/', bill.create);
    router.get('/', bill.findAll);
    router.get('/:id', bill.findOne);
    router.put('/:id', bill.update)
    app.use('/api/bill', router);
}