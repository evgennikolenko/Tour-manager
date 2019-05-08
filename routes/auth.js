const express = require('express');
const auth = require('./../controllers/auth');
const jwtUser = require('./../middleware/jwt-user');

const router = express.Router();

router.post('/login', auth.checkToken, auth.login, auth.jwtAuth);

router.post('/registration', auth.register, auth.jwtAuth);

router.get('/currentUser', jwtUser.getUser, auth.getCurrentUser);

router.get('/jobs', auth.getJobs);

router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

module.exports = router;
