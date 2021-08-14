const router = require('express').Router();
const featuresControllers = require('../controllers/features');
const upload = require('../middlewares/multer_upload');

router.post('/add_room', upload.array('image', 4), featuresControllers.addRoom);

router.get('/get_rooms/:page_number', featuresControllers.getRooms);
// router.get('/get_rooms', featuresControllers.getRooms);
router.post('/add_bookmark', featuresControllers.addBookmark);

router.post('/remove_bookmark', featuresControllers.removeBookmark);

router.post('/get_bookmarks', featuresControllers.getBookmarks);

router.get('/get_count', featuresControllers.getCount);

router.get('/get_bookmark_count/:email', featuresControllers.getCount);

module.exports = router;