const { userModel } = require("../models/login.model");
const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config()
const secret_key = process.env.secret_key

const userRoute = express.Router();



userRoute.post('/register', async (req, res) => {
    const { name, email, pass, age } = req.body;
    try {
        bcrypt.hash(pass, 5, async (err, secure_password) => {
            if (err) {
                console.log(err);
            } else {
                const user = new userModel({ email, pass: secure_password, name, age })
                await user.save();
                res.send("Registed")
            }
        });
    } catch (error) {
        res.send("error in registration the user")
        console.log(error);
    }
 

});


userRoute.post('/login', async (req, res) => {
    const { email, pass } = req.body;
    try {
        // const user = await userModel.findOne({email:email,pass:pass});//this is the traditional way to do it 
        const user = await userModel.find({ email });// this is the ES6 way to do it the same 
        const new_pass = user[0].pass
        

        if (user.length > 0) {
            bcrypt.compare(pass, new_pass, (err, result) =>{
                if(result){
                    // var token = jwt.sign({ course: 'backend' }, secret_key);
                    var token = jwt.sign({ userID:user[0]._id }, secret_key);
                    res.send({ "mass": "Login success", "token": token });
                }else{
                    res.send("wrong Cridntial in bcrypt");
                }
            });
            
        } else {
            res.send("wrong Cridntial");
        }
    } catch (error) {
        console.log(error);
        res.send({ "mass": "something went wrong" });

    }

});


module.exports = {
    userRoute
}