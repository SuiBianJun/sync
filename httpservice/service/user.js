var express = require('express');
var router = express.Router();

router.post("/login", function(req, resp){

    // 请求重定向
    //resp.redirect('/login');
    resp.send('user.html');

});

module.exports = router;