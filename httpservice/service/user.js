var express = require('express');
var router = express.Router();

var dirUtils = require('../sync/utils/dirutils');

router.post("/login", function(req, resp){

    var region = req.body.region;
    var accessKeyId = req.body.accessKeyId;
    var accessKeySecret = req.body.accessKeySecret;

    // 请求oss服务器

    // 登录成功，创建对应用户Id的配置文件夹
    dirUtils.createUserConfigDir(accessKeyId);
    
    //resp.redirect('/login');
    resp.send('user.html');



});

module.exports = router;