var fs = require('fs');
var path = require('path');
var md5 = require('./md5.js');

var configdb = require('../database/configdb');// 应用数据目录
var tokenFilePath = '../database/token.json';// token 文件路径
var configDir = '../config/';// 应用配置目录

var dirData = [];// 同步文件json夹数
var dirMD5Data = [];// 同步文件夹所有文件的MD5数据
var stringRandom = require('string-random');


var DirUtil = function(){
    
};

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
                fs.mkdir(path.resolve(__dirname, configDir + accessKeyId + "/server/"), {recursive: true}, (err) => {
                    if(err)
                        console.log(err);
                    console.log("服务器配置文件夹创建成功");
                    var server = {
                        bucket_syncdir_map: []
                    };
                    fs.writeFile(path.resolve(__dirname, configDir + accessKeyId + "/server/server.json"), JSON.stringify(server), "utf-8", (err) => {
                        if(err)
                            console.log(err);
                        console.log("服务器配置文件创建成功");
                    });
                });
                fs.mkdir(path.resolve(__dirname, configDir + accessKeyId + "/md5/"), {recursive: true}, (err) => {
                    if(err)
                        console.log(err);
                    console.log("MD5文件夹创建成功");
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
        //var tmpPath = "E:\\syncDir";
        dirData = [];
        this.parseDir(path, dirData);
        //console.log(dirData);
        
        return {
            name: path,
            dirs: dirData
        };
    },
    parseDir(path, tempData){// 解析指定文件夹下的所有文件结构为json结构
        var item = {};
        var files = fs.readdirSync(path, {withFileTypes: true});// 同步方式读取文件夹
        for(var i = 0; i < files.length; i++){
            item = {};// 重要，，否则其他过程会影响
            if(files[i].isDirectory()){
                item.type = 1,// 文件类型 1：文件夹 0：文件
                item.name = files[i].name;// 文件或者文件夹名
                item.dirs = [];// 文件夹下的文件
                item.path = path + "\\" + files[i].name,// 文件或者文件夹路径
                //item.sync_state = this.getFileSyncStat(userName, root, path),// 文件或文件夹的同步状态
                tempData.push(item);
                this.parseDir(path + "\\" + files[i].name, tempData[i].dirs);
            }else{
                item.type = 0,
                item.name = files[i].name;
                item.path = path + "\\" + files[i].name,
                //item.sync_state = this.getFileSyncStat(userName, root, path),
                tempData.push(item);
            }
        }
    },
    getFileSyncStat(userName, syncDirPath, currentFilePath){
        var client;
        if(userName == ''){
            // 该用户不存在
        }else{
            var result = fs.readFileSync(path.resolve(__dirname, configDir + userName + "/client/client.json"), {encoding: 'utf-8'});
            client = JSON.parse(result);

            for(var i = 0; i < client.client.length; i++){
                if(client.client[i].local_path == syncDirPath){
                    if(client.client[i].synced == "0"){// 未同步过，都按待上传处理
                        return "upload";
                    }else{
                        if(client.client[i].bucket_name == ""){// 文件夹未设置bucket，设为上传状态
                            return "upload";
                        }else{
                            // 比较MD5值
                            return this.getFileSyncStat(userName, currentFilePath, client.client[i].md5_path);
    
                            //return "sync";
                        }

                    }
                }
            }
            // 同步文件夹异常
        }
    },
    getFileSyncStat(userName, currentFilePath, md5_path){

        var md5_content = {};
        var result = fs.readFileSync(path.resolve(__dirname, md5_path), {encoding: 'utf-8'});
        md5Content = JSON.parse(result);

        var syncDir = md5Content.sync_dir;


        var md5Value = "";
        var file = fs.readFileSync(currentFilePath, {withFileTypes: true});
        if(file.isDirectory()){
            md5Value = md5.getDir(currentFilePath);
        }else{
            md5Value = md5.getFile(currentFilePath);
        }


    },
    getSyncDirSyncStat(root){

    },
    computeDirMD5(path, tempData, root){// 计算文件夹下的所有文件的MD5值,列表形式
        var item = {};
        var tempPath;
        var files = fs.readdirSync(path, {withFileTypes: true});// 同步方式读取文件夹
        for(var i = 0; i < files.length; i++){
            item = {};// 重要，，否则其他过程会影响
            tempPath = path;
            if(files[i].isDirectory()){
                item.type = 1,// 文件类型 1：文件夹 0：文件
                item.path = tempPath.substring(root.length) + "\\" + files[i].name,// 文件或者文件夹路径
                item.md5 = md5.getDir(path + "\\" + files[i].name),// 文件夹MD5值
                tempData.push(item);
                this.computeDirMD5(path + "\\" + files[i].name, tempData, root);
            }else{
                item.type = 0,
                item.path = tempPath.substring(root.length) + "\\" + files[i].name,
                item.md5 = md5.getFile(path + "\\" + files[i].name),// 文件MD5值
                tempData.push(item);
            }
        }
    },
    checkFileSyncState(){// 检查文件状态
        // 存储一份所有 文件的 MD5码文件 到服务器和本地 进行对照
    },
    checkDirAvailable(path){// 检查文件夹是否可用
        try {
            fs.readdirSync(path);
            return true;
        } catch (error) {
            return false;
        }
    },
    addSyncDir(token, syncpath){// 添加同步文件夹, 可添加多个同步文件夹
        // 根据token获取用户名
        var userName = this.getUserNameByToken(token);
        var client;
        if(userName == ''){
            // 该用户不存在
        }else{
            // 写配置到用户配置文件
            var result = fs.readFileSync(path.resolve(__dirname, configDir + userName + "/client/client.json"), {encoding: 'utf-8'});
            client = JSON.parse(result);

            var item = {};
            item.local_path = syncpath;// 使用完整路径方便其他地方直接使用
            item.bucket_name = '';
            item.synced = '0';
            item.md5_path = '';// 使用完整路径方便其他地方直接使用

            // 生成MD5文件名
            var md5_file_name = this.randomString(16);
            item.md5_path = configDir + userName + "/md5/" + md5_file_name + ".json";
            item.md5_file_name = md5_file_name;

            //第一次创建时为空
            var md5_content = {
                sync_dir: syncpath,
                md5_list: [],
                md5_json: [],
                create_time: new Date()
            };

            // 第一次获取同步文件夹MD5信息
            md5_content.md5_list = this.getSyncDirMD5Info(item.local_path);
            var syncDirJsonData = [];
            this.parseDir(item.local_path, syncDirJsonData);
            md5_content.md5_json = syncDirJsonData;

            // 创建md5文件
            fs.writeFile(path.resolve(__dirname, configDir + userName + "/md5/" + md5_file_name + ".json"), JSON.stringify(md5_content), "utf-8", (err) => {
                if(err)
                    console.log(err);
                console.log("同步文件夹：" + syncpath + " md5文件文件创建成功");
            });

            client.client.push(item);

            fs.writeFile(path.resolve(__dirname, configDir + userName + "/client/client.json"), JSON.stringify(client), "utf-8", (err) => {
                if(err)
                    console.log(err);
                console.log("用户同步文件夹添加成功");
            });
        }
    },
    getSyncDirMD5Info(syncDirPath){
        var md5Data = [];
        this.computeDirMD5(syncDirPath, md5Data, syncDirPath);
        return md5Data;
    },
    randomString(length){
        return stringRandom(length, {numbers: false});
    },
    deleteSyncDir(token, dir, callBack){
        var userName = this.getUserNameByToken(token);
        var client;
        if(userName == ''){
            // 该用户不存在
        }else{
            // 写配置到用户配置文件
            var result = fs.readFileSync(path.resolve(__dirname, configDir + userName + "/client/client.json"), {encoding: 'utf-8'});
            client = JSON.parse(result);

            var index = 0;
            var flag = false;
            var md5_file_name = "";
            client.client.forEach((e, i) => {
                if(e.local_path == dir){
                    index = i;
                    flag = true;
                    md5_file_name = e.md5_file_name;
                    return;
                }
            });
            if(flag){
                // 删除关联bucket中的同步文件夹
                if(client.client[index].bucket_name != ''){// 存在关联bucket
                    this.deleteRelateBucket(token, dir);
                }

                client.client.splice(index, 1);
                fs.writeFile(path.resolve(__dirname, configDir + userName + "/client/client.json"), JSON.stringify(client), "utf-8", (err) => {
                    if(err){
                        console.log(err);
                        callBack(false);
                    }
                    callBack(true);
                    console.log("用户同步文件夹添加成功");
                });
                // 删除md5文件
                var md5_file_path = configDir + userName + "/md5/" + md5_file_name + ".json";
                fs.unlink(path.resolve(__dirname, md5_file_path), (err)=>{
                    if(err){
                        console.log("md5 文件删除失败：" + md5_file_path);
                        return;
                    }
                    console.log("md5 文件已删除：" + md5_file_path);
                });
            }else{
                callBack(false);
            }
        }
    },
    deleteRelateBucket(token, dir){// 添加同步文件夹, 可添加多个同步文件夹
        // 根据token获取用户名
        var userName = this.getUserNameByToken(token);
        var server;
        if(userName == ''){
            // 该用户不存在
        }else{
            // 写配置到用户配置文件
            var result = fs.readFileSync(path.resolve(__dirname, configDir + userName + "/server/server.json"), {encoding: 'utf-8'});
            server = JSON.parse(result);

            var flag = false;
            server.bucket_syncdir_map.forEach((e, i) => {
                if(e.syncdir_path == dir){
                    e.syncdir_path = '';
                    flag = true;
                    return;
                }
            });
            // 删除关联文件夹中的bucket
            if(flag){
                fs.writeFile(path.resolve(__dirname, configDir + userName + "/server/server.json"), JSON.stringify(server), "utf-8", (err) => {
                    if(err)
                        console.log(err);
                    console.log("关联Bucket删除成功");
                });
            }
        }
    },
    getUserNameByToken(token){// 通过token获取用户名信息
        var result = fs.readFileSync(path.resolve(__dirname, tokenFilePath), {encoding: 'utf-8'});
        var data;
        if(result.length < 1){
            return '';
        }else{
            data = JSON.parse(result);
            for(var user in data){
                if(data[user].token == token){
                    return user;
                }
            }
        }
        return '';
    },
    syncDirRelateBucket(token, dir, bucket, callBack){
        var userName = this.getUserNameByToken(token);
        var client;
        if(userName == ''){
            // 该用户不存在
        }else{
            // 写配置到用户配置文件
            var result = fs.readFileSync(path.resolve(__dirname, configDir + userName + "/client/client.json"), {encoding: 'utf-8'});
            client = JSON.parse(result);

            client.client.forEach(e => {
                if(e.local_path == dir){
                    e.bucket_name = bucket;
                    return;
                }
            });

            fs.writeFile(path.resolve(__dirname, configDir + userName + "/client/client.json"), JSON.stringify(client), "utf-8", (err) => {
                if(err){
                    console.log(err);
                    callBack(false);
                }
                console.log("同步文件夹与Bucket关联成功");
                callBack(true);
            });
        }
    }
}

//new DirUtil().createUserConfigDir("test");
//console.log(new DirUtil().parseSyncDir(""));
//console.log(new DirUtil().checkDirAvailable("a"));
//new DirUtil().computeDirMD5('E:\\project_test\\syncDir', dirMD5Data, 'E:\\project_test\\syncDir');
//console.log(dirMD5Data);
module.exports = new DirUtil()