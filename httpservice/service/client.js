var express = require('express');
var router = express.Router();

router.get("/syncdir/list", function(req, resp){

    // 请求重定向
    //resp.redirect('/login');
    resp.send('syncdir list');
    // 登录成功，创建对应用户Id的配置文件夹

});

module.exports = router;