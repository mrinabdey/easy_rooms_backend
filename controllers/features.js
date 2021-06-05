const Room = require('../models/room');

exports.addRoom = (req, res) => {
    const imageFile = req.file;
    const address = req.body.address;
    const features = req.body.features;
    const room = new Room({ imageUrl: imageFile.path, address: address, features: features });
    room.save();
    console.log(imageFile, address, features);
    res.status(201).end();
}

exports.getRooms = (req, res) => {
    Room.find()
    // .limit(1)
    .then(rooms => {
        res.json(rooms);
    })
    .catch(err => {
        console.log(err);
    });
}
