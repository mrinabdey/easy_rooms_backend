const router = require('express').Router();
const featuresControllers = require('../controllers/features');
const upload = require('../middlewares/multer_upload');

router.post('/add_room', upload.single('image'), featuresControllers.addRoom);

router.get('/get_rooms', featuresControllers.getRooms);

module.exports = router;