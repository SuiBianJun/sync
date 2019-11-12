var express = require('express');
var router = express.Router();
var fs = require("fs");

var ServerResponse = require('../entity/serverResponse');
var functions = require('../sync/utils/functions');
var dirutils = require('../sync/utils/dirutils');

router.get("/syncdir/list", function(req, resp){// 列出用户同步文件夹

    // 获取client配置信息
    //var data = functions.getUserSyncDirInfo(req.header("AccessToken"));
    //必须使用回调程序执行才能正常
    functions.getUserSyncDirInfo(req.header("AccessToken"), function(data){
        console.log(data);
        resp.send(new ServerResponse().ok(data));
        resp.end();
        return;
    })
    // 登录成功，创建对应用户Id的配置文件夹

});

router.post("/syncdir/add", function(req, resp){// 添加同步文件夹

    var path = req.body.path;
    // 检查path是否可用

    if(!dirutils.checkDirAvailable(path)){
        console.log("invalid path");
        resp.send(new ServerResponse().failed(null, "无效的同步文件夹，请重新配置"));
    }

    var token = req.header("AccessToken");
    // 检查是否已经配置

    // 添加到配置文件中

    dirutils.addSyncDir(token, path);

    resp.send(new ServerResponse().ok());
    resp.end();
    return;

});

router.post("/syncdir/upload", function(req, resp){// 上传文件到远程服务器

    var path = req.body.path;
    // 检查path是否可用
    if(!dirutils.checkDirAvailable(path)){
        console.log("invalid path");
        resp.send(new ServerResponse().failed(null, "无效的文件"));
    }

    var token = req.header("AccessToken");

    // 文件上传逻辑

    // 返回操作结果
    resp.send(new ServerResponse().ok());
    resp.end();
    return;

});

router.post("/syncdir/download", function(req, resp){// 下载文件到本地

    var path = req.body.path;

    var token = req.header("AccessToken");
    // 文件下载逻辑
    // 返回操作结果
    resp.send(new ServerResponse().ok());
    resp.end();
    return;

});

router.post("/syncdir/sync", function(req, resp){// 上传文件到远程服务器

    var path = req.body.path;
    // 检查path是否可用
    if(!dirutils.checkDirAvailable(path)){
        console.log("invalid path");
        resp.send(new ServerResponse().failed(null, "无效的文件"));
    }

    var token = req.header("AccessToken");

    // 文件内容同步逻辑，将远程的修改更新到本地？？？

    // 返回操作结果
    resp.send(new ServerResponse().ok());
    resp.end();
    return;

});


module.exports = router;