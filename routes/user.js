const router = require('express').Router();
const userControllers = require('../controllers/user');

router.post('/edit_profile', userControllers.editProfile);

router.get('/:email', userControllers.getUser);

module.exports = router;