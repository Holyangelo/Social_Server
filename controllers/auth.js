const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const randomToken = require('random-token');
const { connection } = require('../database/config');
const { createJWT } = require('../helpers/createJWT');


const Login = (req = request, res = response) => {
    /* Destructuring information for body */
    const {username, pw} = req.body;
    /* Creates query for MYSQL */
    const q = "SELECT * FROM users WHERE username = ?";
    /* Execute the query */
    connection.query(q, [username], async (err, results, fields) =>{
    if(err) return res.status(500).json({
        message: err
    });
    /*If user exists, return error */
    if(results.length <= 0) return res.status(409).json({
        message: "User or password not match"
    });

    /* Compare sync password for bcryptjs */
    if(!bcrypt.compareSync(pw, results[0].password)){
        return res.status(401).json({
            message: "User or password not match"
        });
    }

    /* erase the password before show */
    const { password, token, ...rest } = results[0];

    /* Generates Token */
    const tokenJWT = jwt.sign({ id: results[0].id,
        expiresIn: '23h',
     }, "secretKey");

    console.log(tokenJWT);
    /* Response for login */
    /* Create cookies for navigator web*/
    res.cookie("accessToken", tokenJWT, {
        httpOnly: true
    }).status(200).json({
        message: "You are Logged",
        rest,
        tokenJWT
    });
});
}

const Register = (req = request, res = response) => {
    /* Destructuring information for body */
    const {username, email, password, name, picture = 'default.png', profilePicture = 'default.png', city = '', website = ''} = req.body;
    if(!username) {
        return res.status(400).json({
            message : "Username not be Empty"
        });
    }
    if(!password) {
        return res.status(400).json({
            message : "Password not be Empty"
        });
    }
    if(!email) {
        return res.status(400).json({
            message : "Email not be Empty"
        });
    }
    if(!name) {
        return res.status(400).json({
            message : "Name not be Empty"
        });
    }
    /* Creates query for MYSQL */
    const q = "SELECT * FROM users WHERE username = ?";
    /* Execute the query */
   connection.query(q, [username], (err, data) =>{
        if(err) return res.status(500).json({
            message: err
        });
        /*If user exists, return error */
        if(data.length) return res.status(409).json({
            message: "User already exists"
        });
        /* Creates a validation token */
        const token = randomToken(16);
        /* Creates a salt for encrypt password */
        const salt = bcrypt.genSaltSync();
        /* Password Hashed */
        const passwordHashed = bcrypt.hashSync(password, salt);
        /*Creates a query for insert */
        const q = "INSERT INTO users(`username`, `email`, `password`, `name`, `picture`, `profilePicture`, `city`, `website`, `token`) VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?)";
        /* Execute the query */
        connection.query(q, [username, email, passwordHashed, name, picture, profilePicture, city, website, token], (err, data) =>{
            if(err) return res.status(500).json({
                message: err
            });
            return res.status(200).json({
                message:"User registered",
                id: data.insertId
            });
        });
    });
}

const Logout = (req = request, res = response) => {
    /* Clear Cookies Logout */
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).json({
        message: "You are Logout"
    })
}

module.exports = {
    Login,
    Logout,
    Register
}