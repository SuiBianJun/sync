var express = require('express');
var router = express.Router();
var fs = require("fs");

var ServerResponse = require('../entity/serverResponse');
var functions = require('../sync/utils/functions');

router.get("/syncdir/list", function(req, resp){

    // 获取client配置信息
    //var data = functions.getUserSyncDirInfo(req.header("AccessToken"));
    //必须使用回调程序执行才能正常
    functions.getUserSyncDirInfo(req.header("AccessToken"), function(data){
        resp.send(new ServerResponse().ok(data));
    })
    // 登录成功，创建对应用户Id的配置文件夹

});

module.exports = router;