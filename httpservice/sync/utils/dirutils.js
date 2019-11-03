var fs = require('fs');
var path = require('path');

var configDir = '../config/';

var DirUtil = function(){
    
}

DirUtil.prototype = {
    createUserConfigDir(accessKeyId){
        fs.readdir(path.resolve(__dirname, configDir), {withFileTypes: true}, function(err, files){
            var hasUserDir = false;
            files.forEach(function(file){
                if(file.isDirectory){
                    console.log("dir: " + file.name);
                    if(accessKeyId == file.name){
                        // 存在用户目录
                        hasUserDir = true;
                    }
                }
            });

            if(!hasUserDir){
                // 创建用户目录
                fs.mkdir(path.resolve(__dirname, configDir + accessKeyId), { recursive: true }, (err) => {
                    if(err)
                        console.log(err);
                });
            }
        });
    }
}

//new DirUtil().createUserConfigDir("test");

module.exports = new DirUtil()