const jwt = require('jsonwebtoken');

exports.verifyToken = (token) => {
    try {
        const res = jwt.verify(token, 'thisisasecretkey');
        return true;
    }
    catch(err) {
        return false;
    }
}

exports.createToken = (email) => {
    const token = jwt.sign({email: email}, 'thisisasecretkey', { expiresIn: '1h' });
    return token;
}