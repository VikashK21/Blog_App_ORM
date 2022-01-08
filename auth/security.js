require('dotenv').config();
const jwt = require('jsonwebtoken');
// console.log(process.env.SECRETE_TOKEN);

// const secrete = require('crypto').randomBytes(64).toString('hex');
// console.log(secrete);
authenticationToken = (data) => {
    const id = `${data.id}`;
    return jwt.sign(id, process.env.SECRETE_TOKEN);
}

authorizationToken = (req, res, next) => {
    if (req.headers.cookie) {
        const token = req.headers.cookie.split("=")[1]
        const decode = jwt.verify(token, process.env.SECRETE_TOKEN)
        req.userID = decode;
        next()
    } else {
        next(res.status(403).json({
            message: "Not yet logged in!!"
        }))
        console.log('token not found');
    }
}

toLogout = (req, res, next) => {
    if (req.headers.cookie) {
        next(res.status(406).json({
            message: "Log Out first!!"
        }))
        console.log('Not logged out yet!!');
    } else {
        next()
    }
}


module.exports = { authenticationToken, authorizationToken, toLogout };