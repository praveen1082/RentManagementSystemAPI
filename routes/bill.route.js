module.exports = app => {
    const bill = require('../controllers/bill.controller');
    var router = require('express').Router();
    router.post('/', bill.create);
    app.use('/api/bill', router);
}