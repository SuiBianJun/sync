var common = require('./common');

var CommonFunction = function(){
    //this.common = common;
}

CommonFunction.prototype = {
    // 写token到文件
    writeToken2File(token){
        common.fs.readFile(common.path.resolve(__dirname, "../database/token.json"), {encoding: "utf-8"}, (err, data) => {
            if(err){
                console.log(err);
            }
            var tokens = {};
            if(data.length > 0){
                tokens = JSON.parse(data);
            }
            tokens[token.accessKeyId] = {};
            tokens[token.accessKeyId].token = token.token;
            tokens[token.accessKeyId].expire = new Date().getTime() + common.config.token.expire;

            common.fs.writeFile(common.path.resolve(__dirname, "../database/token.json"), JSON.stringify(tokens), "utf-8", (err) => {
                if(err)
                    console.log(err);
                console.log("用户token创建成功");
            });

        });
    },
    // token检查
    checkTokenExpire(token, callBack){
        if("" == token){
            return false;
        }
        common.fs.readFile(common.path.resolve(__dirname, "../database/token.json"), {encoding: "utf-8"}, (err, data) => {
            if(err){
                console.log(err);
            }
            var tokens = {};
            var flag = 1;
            if(data.length > 0){
                tokens = JSON.parse(data);
                for(var user in tokens){
                    if(tokens[user].token == token){
                        flag = 0;
                        if(new Date().getTime() > tokens[user].expire){
                            // token过期
                            callBack(false);
                        }else{
                            // 更新 token expire
                            tokens[user].expire = new Date().getTime() + common.config.token.expire;
                            common.fs.writeFile(common.path.resolve(__dirname, "../database/token.json"), JSON.stringify(tokens), "utf-8", (err) => {
                                if(err)
                                    console.log(err);
                                console.log("用户token失效时间更新成功");
                                callBack(true);
                            });
                        }
                    }
                }
                if(flag){
                    // 无token记录
                    callBack(false);
                }
            }else{
                // 无登录记录
                callBack(false);
            }
        });
    },
    getUserSyncDirInfo(token, callBack){// 根据token获取用户的同步文件夹信息
        common.fs.readFile(common.path.resolve(__dirname, "../database/token.json"), {encoding: "utf-8"}, (err, data) => {
            if(err){
                console.log(err);
            }
            var tokens = {};
            var userId = '';
            if(data.length > 0){
                tokens = JSON.parse(data);

                for(var user in tokens){
                    if(tokens[user].token == token){
                        userId = user;
                        break;
                    }
                }
                // 根据userId获取对应配置
                common.fs.readFile(common.path.resolve(__dirname, "../config/" + userId + "/client/client.json"), {encoding: "utf-8"}, (err, data) => {
                    if(err){
                        console.log(err);
                    }
                    var config = {};
                    if(data.length > 0){
                        config = JSON.parse(data);
                        console.log(config);
                        callBack(config.client);
                    }else{
                        // 配置错误
                    }

                });
            }else{
                // 配置文件错误
            }

        });
    }
}

//new CommonFunction().writeToken2File({accessKeyId: 'test', token: "123"});

module.exports = new CommonFunction();