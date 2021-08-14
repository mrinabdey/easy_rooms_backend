const User = require('../models/user');

exports.editProfile = async (req,res) => {
    const email = req.body.email;
    const name = req.body.name;
    const location = req.body.location;
    const contact = req.body.contact;
    console.log("Hit");
    console.log(email,name,location,contact);
    await User.updateOne({email: email}, {name: name, address: location, contact: contact});
    res.status(200).json('Your profile is updated!');
}

exports.getUser = (req,res) => {
    console.log('Got user');
    const email = req.params.email;
    User.findOne({email: email}, (err,user) => {
        if(user) {
            return res.json(user);
        }
    });
}