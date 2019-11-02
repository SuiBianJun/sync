var express = require('express');
var router = express.Router();

router.post("/login", function(req, resp){

    // 请求重定向
    //resp.redirect('/login');
    resp.send('user.html');

    // 登录成功，创建对应用户Id的配置文件夹

});

module.exports = router;