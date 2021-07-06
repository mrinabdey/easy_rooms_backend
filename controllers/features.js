const Room = require('../models/room');

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
    console.log(imageFilePaths);
    const room = new Room({ imageUrls: imageFilePaths, address: address, features: features, price: price, title: title });
    room.save();
    // console.log(imageFile, address, features);
    res.status(201).end();
}

exports.getRooms = (req, res) => {
    const pageNumber = parseInt(req.params.page_number);
    Room.find()
    // .skip(4 * pageNumber)  // provide four documents at a time
    // .limit(4)
    .then(rooms => {
        res.json(rooms);
    })
    .catch(err => {
        console.log(err);
    });
}
