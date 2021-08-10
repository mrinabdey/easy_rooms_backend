const router = require('express').Router();
const authControllers = require('../controllers/auth');

router.post('/signup', authControllers.signup);

router.post('/login', authControllers.login);

router.get('/verify_token', authControllers.tokenVerification);

router.get('/user/:email', authControllers.getUser);

module.exports = router;