var fs = require('fs');
var path = require('path');

var configdb = require('../database/configdb');

var configDir = '../config/';

var DirUtil = function(){
    
}

DirUtil.prototype = {
    createUserConfigDir(accessKeyId){
        fs.readdir(path.resolve(__dirname, configDir), {withFileTypes: true}, function(err, files){
            var hasUserDir = false;
            files.forEach(function(file){
                if(file.isDirectory){
                    if(accessKeyId == file.name){
                        // 存在用户目录
                        console.log("用户目录已存在：" + file.name);
                        hasUserDir = true;
                    }
                }
            });

            if(!hasUserDir){
                // 创建用户目录
                fs.mkdir(path.resolve(__dirname, configDir + accessKeyId + "/client/"), {recursive: true}, (err) => {
                    if(err)
                        console.log(err);
                    console.log("用户配置文件夹创建成功");
                    var client = {
                        client: []
                    };
                    fs.writeFile(path.resolve(__dirname, configDir + accessKeyId + "/client/client.json"), JSON.stringify(client), "utf-8", (err) => {
                        if(err)
                            console.log(err);
                        console.log("用户配置文件创建成功");
                    });
                });
            }
        });
    }
}

//new DirUtil().createUserConfigDir("test");

module.exports = new DirUtil()