/* eslint new-cap: 0 */
const express = require('express');
const router = express.Router();
const indexController = require('./controllers/index');

router.get('/', indexController);

module.exports = router;
