const { Router } = require('express');
const { check } = require('express-validator');
const { getUser } = require('../controllers/users');
const { validateMiddleware } = require('../middleware/validate_middleware');

const router = new Router();

router.get('/find/:userId', [validateMiddleware], getUser);

module.exports = router;