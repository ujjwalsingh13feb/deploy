const jwt = require('jsonwebtoken');
require('dotenv').config()
const secretKey = process.env.secret_key

const  Authentication = (req,res,next) => {
const token = req.headers.authorization

if(token) {
    const decoded = jwt.verify(token,secretKey)

    if(decoded){
        const userID = decoded.userID
        console.log(userID)
        req.body.userID = userID
        next();
    }else{
        res.send("Please login first")
    }
}else{
    res.send("Please login first")
}
}

module.exports ={
    Authentication
}

