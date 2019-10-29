var express = require('express');
var router = express.Router();

var user = require('../service/user');

router.use('/user', user);

module.exports = router;