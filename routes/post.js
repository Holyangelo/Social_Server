const { Router } = require('express');
const { check } = require('express-validator');
const { getUser } = require('../controllers/users');
const { validateMiddleware } = require('../middleware/validate_middleware');
const { getPosts, addPost } = require("../controllers/post");

const router = new Router();

/* Router */
router.get("/", [validateMiddleware], getPosts);
router.post("/", [validateMiddleware], addPost);

/*Exports */
module.exports = router;