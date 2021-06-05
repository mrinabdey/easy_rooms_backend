const bcrypt = require('bcrypt');
const User = require('../models/user');
const authorize = require('../middlewares/authorize');

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    User.findOne({email: email}, (err, user) => {
        if(user) {
            bcrypt.compare(password, user.password)
            .then(result => {
                if(result) {
                    return res.status(200).json(authorize.createToken(user.email));
                    // return res.status(200).json("User Valid!");
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
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    User.findOne({email: email}, (err, user) => {
        if(user) {
            return res.status(409).json('User already exists!');
        }
        bcrypt.hash(password, 5)
        .then(hashedPassword => {
            const user = new User({email: email, password: hashedPassword});
            user.save();
        });
        return res.status(200).json(`User is signedup!`);
    });
}