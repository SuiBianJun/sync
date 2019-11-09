var fs = require('fs');
var path = require('path');

var configdb = require('../database/configdb');

var configDir = '../config/';

var dirData = [];

var DirUtil = function(){
    
}

DirUtil.prototype = {
    createUserConfigDir(accessKeyId){// 创建用户目录
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
    },
    parseSyncDir(path){// 解析同步目录结构为json格式
        // var dirData = {
        //     name: '/var/syncdir',
        //     dirs: [
        //         {
        //             type: 1,
        //             name: 'a',// /var/syncdir/a
        //             dirs: [
        //                 {
        //                     type: 0,
        //                     name: 'a.txt'// /var/syncdir/a/a.txt
        //                 },
        //                 {
        //                     type: 0,
        //                     name: 'a2.txt'// /var/syncdir/a/a2.txt
        //                 }
        //             ]
        //         },
        //         {
        //             type: 1,
        //             name: 'b',// /var/syncdir/b
        //             dirs: [
        //                 {
        //                     type: 0,
        //                     name: 'b.txt'// /var/syncdir/b/b.txt
        //                 },
        //                 {
        //                     type: 0,
        //                     name: 'b2.txt'// /var/syncdir/b/b2.txt
        //                 },
        //                 {
        //                     type: 1,
        //                     name: 'b2',// /var/syncdir/a/b
        //                     dirs: [
        //                         {
        //                             type: 1,
        //                             name: 'b3',// /var/syncdir/b/b/b3.txt
        //                             dirs: [
        //                                 {
        //                                     type: 1,
        //                                     name: 'b4',
        //                                     dirs: [
        //                                         {
        //                                             type: 1,
        //                                             name: 'b5',
        //                                             dirs: [
        //                                                 {
        //                                                     type: 0,
        //                                                     name: 'b6.txt',
        //                                                     // dirs: [
        //                                                     //     {
                                                                    
        //                                                     //     }
        //                                                     // ]
        //                                                 }
        //                                             ]
        //                                         }
        //                                     ]
        //                                 }
        //                             ]
        //                         }
        //                     ]
        //                 }
        //             ]
        //         }
        //     ]
        // };
        //var tmpPath = "E:\\vscode_workspace\\html";
        var tmpPath = "E:\\syncDir";
        this.parseDir(tmpPath, dirData);
        //console.log(dirData[0].dirs[1].dirs);
        
        return {
            name: path,
            dirs: dirData
        };
    },
    parseDir(path, tempData){
        var item = {};
        var files = fs.readdirSync(path, {withFileTypes: true});// 同步方式读取文件夹
        for(var i = 0; i < files.length; i++){
            item = {};// 重要，，否则其他过程会影响
            if(files[i].isDirectory()){
                item.type = 1,
                item.name = files[i].name;
                item.dirs = [];
                tempData.push(item);
                this.parseDir(path + "/" + files[i].name, tempData[i].dirs);
            }else{
                item.type = 0,
                item.name = files[i].name;
                tempData.push(item);
            }
        }
    }
}

//new DirUtil().createUserConfigDir("test");
new DirUtil().parseSyncDir("");
//module.exports = new DirUtil()