/* Require Section */
const express = require('express');
const {request, response, next} = require("express");
const cors = require('cors');
const fileUpload = require('express-fileupload');
const connectionMYSQL = require('../database/config');
const { cookie } = require('express-validator');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
/* Create the class server */
class Server{

	/* Create Server Constructor */
	constructor(){
		/* Create Express */
		this.app = express();
		/* Create Port */
		this.port = 4000 || process.env.PORT
		/* Create Paths */
		this.paths = {
			mainPath : '/',
			authPath: '/auth',
			usersPath:'/users',
			postPath:"/post",
			uploadPath:"/upload",
		}
		/* Create Middleware */
		this.middleware();
		/* Create Routes */
		this.routes();
	}

	/* Middlewares for Express Server */
	middleware(){
		/* Create Uses Origin */
		this.app.use((res = response, req = request, next) =>{
			res.header("Access-Control-Allow-Credentials", true)
			next()
		});
		/* Create Uses Cors */
		this.app.use(cors({
			credentials:true,
			origin: "http://localhost:3000"}));
		/* Create Uses Cors */
		this.app.use(cookieParser());
		/* Create Uses Parser JSON */
		this.app.use(express.json());
		/* Create Url encoded Parse */
		this.app.use(express.urlencoded({ extended: true }));
		// parse application/x-www-form-urlencoded
		this.app.use(bodyParser.urlencoded({ extended: false }));
		// parse application/json
		this.app.use(bodyParser.json());
		/* Create Root Folder for Web */
		this.app.use(express.static('public'));
		/* Create Uses for File Upload to Server */
		this.app.use(fileUpload({ 
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
	}

	/* Routes for Express Server */
	routes(){
		/* Create Main Route */
		this.app.use(this.paths.mainPath, require('../routes/main'));
		/* Create Auth Route */
		this.app.use(this.paths.authPath, require('../routes/auth'));
		/* Create Users Route */
		this.app.use(this.paths.usersPath, require('../routes/users'));
		/* Create Post Route */
		this.app.use(this.paths.postPath, require('../routes/post'));
		/* Create Upload Route */
		this.app.use(this.paths.uploadPath, require('../routes/uploads'));
	}

	/* Listening for Express Server */
	listen(){
		/* Listening PORT */
		this.app.listen(this.port, () =>{
			console.log('This app run on port: ' + this.port);
		});
	}
}

/* Create Exports */
module.exports = Server;