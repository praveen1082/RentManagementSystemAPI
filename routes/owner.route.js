module.exports = app => {
    const owners = require('../controllers/owner.controller');
    var router = require('express').Router();
    router.post('/', owners.create);
    router.get('/', owners.findAll);
    router.get('/:id', owners.findOne);
    router.put('/:id', owners.update)
    app.use('/api/owner', router);
}