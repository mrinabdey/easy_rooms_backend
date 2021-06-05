const { Schema, model } = require('mongoose');

const roomSchema = new Schema({
    imageUrl: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    features: {
        type: String,
        required: true,
    }
});

module.exports = model('Room', roomSchema);