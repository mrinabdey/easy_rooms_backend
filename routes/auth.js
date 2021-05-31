const router = require('express').Router();
const authControllers = require('../controllers/auth');

router.post('/signup', authControllers.signup);

router.post('/login', authControllers.login);

module.exports = router;