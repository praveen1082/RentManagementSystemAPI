module.exports = app => {
    const users = require('../controllers/user.controller');
    var router = require('express').Router();
    router.post('/', users.create);
    router.get('/', users.findAll);
    router.get('/:userId', users.findOne);
    router.put('/:userId', users.update);
    router.post('/user/login', users.login);
    app.use('/api/user', router);
}