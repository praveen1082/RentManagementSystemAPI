module.exports = app => {
    const owners = require('../controllers/owner.controller');
    var router = require('express').Router();
    router.post('/', owners.create);
    app.use('/api/owner', router);
}