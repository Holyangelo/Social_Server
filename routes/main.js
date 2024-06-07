/* Requires For Router */
const { Router } = require('express');
const { check } = require('express-validator');
const { main } = require('../controllers/main');
const { validateMiddleware } = require('../middleware/validate_middleware');
//end require

//instanciamos
const router = new Router();
//end instanciamos

//POST for new path '/login'
router.get('/',[validateMiddleware], main);


/* Create Exports */
module.exports = router;