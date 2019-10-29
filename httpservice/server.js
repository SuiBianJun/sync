var express = require('express');
var fs = require('fs');
var router = require('./router/router');
var app = express();

function sync_http_server(port = 5000){
    this.port = port;
}

sync_http_server.prototype = {
    init: function(){
        console.log('sync http server start on: ' + this.port);
        app.listen(this.port);
    }
}

app.use('/static', express.static(__dirname + '/dist'));

app.use("/", router);

new sync_http_server(5000).init();

//模块导出
//module.exports = sync_http_server;