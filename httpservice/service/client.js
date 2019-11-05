var express = require('express');
var router = express.Router();
var fs = require("fs");

var ServerResponse = require('../entity/serverResponse');

router.get("/syncdir/list", function(req, resp){

    // 获取client配置信息

    resp.send(new ServerResponse().ok());
    // 登录成功，创建对应用户Id的配置文件夹

});

module.exports = router;