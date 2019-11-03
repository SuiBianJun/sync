var express = require('express');
var router = express.Router();

var user = require('../service/user');
var client = require('../service/client')

router.use('/user', user);
router.use('/client', client);

module.exports = router;