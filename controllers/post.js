const {request, response, next} = require("express");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { connection } = require("../database/config");

const getPosts = async(req = request, res = response) => {
    /* Accedemos al token de las cookies */
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json({msg: "Not Logged In!"});
    try {
        jwt.verify(token, "secretKey", (err, userInfo) =>{
            if(err) return res.status(403).json({msg: "Token is not valid"});
            const q = `SELECT p.*, name, u.id as userId, profilePicture FROM post as p 
            INNER JOIN users as u on (u.id = p.userId)
            LEFT JOIN relationships as r on (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ?
            ORDER BY p.createdAt DESC`;
            connection.query(q, [userInfo.id, userInfo.id], async (err, results, fields) =>{
            if(err) return res.status(500).json({
                message: err
            });
            /*If user exists, return error */
            if(results.length <= 0) return res.status(409).json({
                message: "Posts dont exists"
            });
    
           /* const posts = results.map(data => {
                const { password, token, city, website, ...rest } = data;
                return res.status(200).json({
                    rest
                })
            });*/
            return res.status(200).json({
                results
            })
        });
    });
    } catch (error) {
        console.log(error);
    }
}

const addPost = async(req = request, res = response) => {
    /* Accedemos al token de las cookies */
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json({msg: "Not Logged In!"});
    try {
        jwt.verify(token, "secretKey", (err, userInfo) =>{
            if(err) return res.status(403).json({msg: "Token is not valid"});
            const {description, img } = req.body;
            /* Obtener y convertir el tiempo actual*/
            const createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
            const userId = userInfo.id;
            const values = [
                description,
                img,
                userId,
                createdAt
            ];
            const q = "INSERT INTO post(`description`, `img`, `userId`, `createdAt`) VALUES (?)";
            connection.query(q, [values], async (err, results, fields) =>{
            if(err) return res.status(500).json({
                message: err
            });
           /* const posts = results.map(data => {
                const { password, token, city, website, ...rest } = data;
                return res.status(200).json({
                    rest
                })
            });*/
            return res.status(200).json({
                msg: "Post has been created",
                results
            })
        });
    });
    } catch (error) {
        console.log(error);
    }
}

/* Exports */
module.exports = {
    getPosts,
    addPost
}