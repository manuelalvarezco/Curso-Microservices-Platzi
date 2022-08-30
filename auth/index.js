const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;
const error = require('../utils/error')

const sign = (data) => {
    return jwt.sign(data, config.jwt.secret)
}

const verify = (token) => {
    return jwt.verify(token, secret)
}

const check = {
    own: (req, owner) => {
        const decoded = decodeHeader(req)
        if(decoded.id !== owner){ throw error('Not allowed!', 401)}
    },
    logged: (req) => {
        const decoded = decodeHeader(req)
    }
}

const decodeHeader = (req) =>{
    const authorization = req.headers.authorization || '' ;
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}


const getToken = (authorization)=> {
    if(!authorization){ throw error('Token not found!', 401)  }

    if(authorization.indexOf('Bearer ') === -1){ throw error('Invalid token format!', 401)}

    let token = authorization.replace('Bearer ', '');

    return token;
}




module.exports = {
    sign,
    check
}