var express = require('express');
var router = express.Router();
var stringRandom = require('string-random');


var dirUtils = require('../sync/utils/dirutils');
var ServerResponse = require("../entity/serverResponse");

var functions = require('../sync/utils/functions');

router.post("/login", function(req, resp){

    var region = req.body.region;
    var accessKeyId = req.body.accessKeyId;
    var accessKeySecret = req.body.accessKeySecret;

    // 请求oss服务器

    // 登录成功，创建对应用户Id的配置文件夹
    dirUtils.createUserConfigDir(accessKeyId);

    // 生成token返回
    var tokenStr = stringRandom(32);
    var token = {
        accessKeyId: accessKeyId,
        token: tokenStr
    }
    // 写token到文件
    functions.writeToken2File(token);
    // 返回token
    resp.header("accesstoken", token.token);
    resp.send(new ServerResponse().ok());
});

module.exports = router;