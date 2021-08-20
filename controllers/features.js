const Room = require('../models/room');
const User = require('../models/user');

exports.addRoom = (req, res) => {
    const imageFiles = req.files;
    const address = req.body.address;
    const features = req.body.features;
    const price = req.body.price;
    const title = req.body.title;
    // const imageFilePaths = [];
    const imageFilePaths = imageFiles.map(imageFile => imageFile.path);
    // for(let i=0;i<imageFiles.length;i++) {
    //     imageFilePaths.push(imageFiles[i].path);
    // }
    // console.log(imageFilePaths);
    const room = new Room({ imageUrls: imageFilePaths, address: address, features: features, price: price, title: title });
    room.save();
    // console.log(imageFile, address, features);
    res.status(201).end();
}

exports.getRooms = (req, res) => {
    const pageNumber = parseInt(req.params.page_number);
    console.log(pageNumber);
    Room.find()
    .skip(4 * pageNumber)  // provide four documents at a time
    .limit(4)
    .then(rooms => {
        res.json(rooms);
    })
    .catch(err => {
        console.log(err);
    });
}

exports.addBookmark = async (req,res) => {
    const roomId = req.body.roomId;
    const email = req.body.email;
    let newBookmarks;
    await User.findOne({email: email}, async (err,user) => {
        if(err)
            return;
        newBookmarks = user.bookmarks;
        if(!newBookmarks)
        newBookmarks = [];
        newBookmarks.push(roomId);
        await User.updateOne({email: email}, {bookmarks: newBookmarks});
    });
    return res.status(201).json('Bookmark added successfully');
}

exports.removeBookmark = async (req,res) => {
    const roomId = req.body.roomId;
    const email = req.body.email;
    let newBookmarks;
    let updatedBookmarks;
    await User.findOne({email: email}, async (err,user) => {
        if(err)
            return;
        newBookmarks = user.bookmarks;
        if(!newBookmarks) {
            updatedBookmarks = [];
        }
        else if(newBookmarks.length > 0) {
            updatedBookmarks = newBookmarks.filter(id => id !== roomId);
            if(!updatedBookmarks)
                updatedBookmarks = [];
        }
        await User.updateOne({email: email}, {bookmarks: updatedBookmarks});
    });
    return res.status(201).json('Bookmark removed successfully');
}

exports.getBookmarks = (req,res) => {
    let bookmarkedRooms = [];
    const roomIds = req.body.roomIds;
    let bookmarkedRoomIds = roomIds.split(',');
    let len = bookmarkedRoomIds.length;
    bookmarkedRoomIds.map((roomId, index) => {
        Room.findById(roomId, (err,room) => {
            if(err)
                return;
            bookmarkedRooms.push(room);
            if(index === len-1) {
                return res.status(201).json(bookmarkedRooms);
            }
        });
    });
}

exports.getCount = (req,res) => {
    Room.countDocuments({}, (err,count) => {
        return res.json(count);
    });
}

exports.getBookmarkCount = (req,res) => {
    const email = req.params.email;
    Room.countDocuments({}, (err,count) => {
        return res.json(count);
    });
}