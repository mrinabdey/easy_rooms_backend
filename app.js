const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const port = process.env.PORT || 4000;
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() - file.filename);
    },
    destination: (req, file, cb) => {
        cb(null, 'images');
    }
});
const upload = multer({ storage: storage });

app.use(cors());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/auth', authRoutes);

mongoose.connect('mongodb+srv://easyrooms:Fiber0009@cluster0.p4nvm.mongodb.net/easyrooms?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', () => {
    console.log('Connection Error!');
});

db.once('open', () => {
    app.listen(port, () => {
        console.log(`Server is running at port ${port}`);
    });
});