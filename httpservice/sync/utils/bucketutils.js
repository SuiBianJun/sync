var common = require('./common');
var fs = require('fs');
var path = require('path');

var configDir = '../config/';// 应用配置目录
var tokenFilePath = '../database/token.json';// token 文件路径
var BucketUtils = function(){}

BucketUtils.prototype = {
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
    addBucket(token, bucket){// 添加同步文件夹, 可添加多个同步文件夹
        // 根据token获取用户名
        var userName = this.getUserNameByToken(token);
        var server;
        if(userName == ''){
            // 该用户不存在
        }else{
            // 写配置到用户配置文件
            var result = fs.readFileSync(path.resolve(__dirname, configDir + userName + "/server/server.json"), {encoding: 'utf-8'});
            server = JSON.parse(result);

            var item = {};
            item.bucket = bucket;
            item.syncdir_path = '';
            item.empty = '1';
            server.bucket_syncdir_map.push(item);

            fs.writeFile(path.resolve(__dirname, configDir + userName + "/server/server.json"), JSON.stringify(server), "utf-8", (err) => {
                if(err)
                    console.log(err);
                console.log("服务器Bucket添加成功");
            });
        }
    },
    getUserBucketInfo(token, callBack){

        var userName = this.getUserNameByToken(token);
        if(userName == ''){

        }else{
            common.fs.readFile(common.path.resolve(__dirname, "../config/" + userName + "/server/server.json"), {encoding: "utf-8"}, (err, data) => {
                if(err){
                    console.log(err);
                }
                var config = {};
                if(data.length > 0){
                    config = JSON.parse(data);
                    console.log(config);
                    callBack(config.bucket_syncdir_map);
                }else{
                    // 配置错误
                }

            });
        }
    },
    getUnusedBucket(token, callBack){
        var userName = this.getUserNameByToken(token);
        if(userName == ''){

        }else{
            common.fs.readFile(common.path.resolve(__dirname, "../config/" + userName + "/server/server.json"), {encoding: "utf-8"}, (err, data) => {
                if(err){
                    console.log(err);
                }
                var unusedBucket = [];
                var config = {};
                var item;
                if(data.length > 0){
                    config = JSON.parse(data);
                    console.log(config);

                    // 未使用的Bucket: 未添加syncdir 并且 empty为空的
                    config.bucket_syncdir_map.forEach((e) => {
                        item = {};
                        if(e.syncdir_path == '' && e.empty == '1'){
                            item.name = e.bucket;
                            unusedBucket.push(item);
                        }
                    });

                    callBack(unusedBucket);
                }else{
                    // 配置错误
                }

            });
        }
    }
}

module.exports = new BucketUtils();