const { Router } = require('express');
const { check } = require('express-validator');
const { Login, Logout, Register } = require('../controllers/auth');
const { validateMiddleware } = require('../middleware/validate_middleware');

const router = new Router();

router.post('/login', [
    check("username", "username not be empty").notEmpty(),
    check("pw", "password not be empty").notEmpty(),
    validateMiddleware], Login);

router.post('/register', [
    check('email', 'Email not be Empty').notEmpty(),
    check("username", "Username not be Empty").notEmpty(),
    check("password", "Password not be Empty").notEmpty(),
    check("name", "Name not be Empty").notEmpty(),
    check("email", "Email is not valid").isEmail().escape(),
    validateMiddleware], Register);

router.get('/logout', [validateMiddleware], Logout);

module.exports = router;