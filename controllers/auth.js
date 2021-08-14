const bcrypt = require('bcrypt');
const User = require('../models/user');
const authorize = require('../middlewares/authorize');

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email}, (err, user) => {
        if(user) {
            bcrypt.compare(password, user.password)
            .then(result => {
                if(result) {
                    return res.status(200).json({token: authorize.createToken(user.email), email: user.email, name: user.name, bookmarks: user.bookmarks});
                }
                return res.status(201).json('Incorrect Password!');
            })
            .catch(err => {
                console.log(err);
            })
        }
        else {
            return res.status(201).json('Sign up first!');
        }
    })
}

exports.signup = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const contact = req.body.contact;
    const address = req.body.address;
    console.log(email, password);
    User.findOne({email: email}, (err, user) => {
        if(user) {
            return res.status(409).json('User already exists!');
        }
        bcrypt.hash(password, 5)
        .then(hashedPassword => {
            const user = new User({name: name, email: email, password: hashedPassword, contact: contact, address:address, bookmarks: []});
            user.save();
        });
        return res.status(200).json(`User is signedup!`);
    });
}

exports.tokenVerification = (req, res) => {
    const token = req.headers["authorization"].split(' ')[1];
    if(authorize.verifyToken(token)) {
        res.status(200).json(true);
    } else {
        res.status(200).json(false);
    }
}

