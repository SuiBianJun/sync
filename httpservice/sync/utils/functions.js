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
    }
}

//new CommonFunction().writeToken2File({accessKeyId: 'test', token: "123"});

module.exports = new CommonFunction();