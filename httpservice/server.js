var express = require('express');
var fs = require('fs');
var url = require('url');
var bodyParser = require('body-parser');

var router = require('./router/router');

var app = express();
var ServerResponse = require('./entity/serverResponse');
var functions = require('./sync/utils/functions'); 

// post数据解析中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

function sync_http_server(port = 5000){
    this.port = port;
}

sync_http_server.prototype = {
    init: function(){
        console.log('sync http server start on: ' + this.port);
        app.listen(this.port);
    }
}

//app.use('/static', express.static(__dirname + '/dist/html'));
// static换成项目名
app.use('/static', express.static(__dirname + '/dist/static'));
//app.use('/static/fonts', express.static(__dirname + '/dist/static/fonts'));


app.get("/favicon.ico", function(req, resp){
    fs.readFile(__dirname + "favicon.ico", function(err, data){
        resp.send("aa".toString());
    });
});


// accesstoken 全局检查
app.use("/", function(req, resp, next){

    // 解析getq 请求参数，以键值对方式挂载到req请求中，方便后续操作
    req.query = url.parse(req.url, true).query;

    console.log("url: " + req.url);

    // 不用检查token
    if(req.url == "/user/login"){
        console.log("pass");
        next();
    }else{
        // 检查token
        var token = req.header("AccessToken");
        // 检查token是否过期
        console.log("token: " + token);
        functions.checkTokenExpire(token, (result) => {
            // token失效
            if(!result){
                console.log("redirect");
                resp.send(new ServerResponse().redirect({location: "/static/html/login/login.html"}));
                resp.end();
                return;
            }else{
                // 更新token 失效时间
                next();
            }
        });
    }
    //next();
});

app.use("/", router);

new sync_http_server(5000).init();

//模块导出
//module.exports = sync_http_server;