const { Router } = require('express');
const { check } = require('express-validator');
const { uploaded } = require("../controllers/uploads");
const { validateMiddleware } = require('../middleware/validate_middleware');

const router = new Router();

router.post('/storage', [validateMiddleware], uploaded);

module.exports = router;