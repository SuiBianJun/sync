var express = require('express');
var fs = require('fs');
var app = express();

function sync_http_server(port = 3000){
    this.port = port;
}

sync_http_server.prototype = {
    init: function(){
        console.log('sync http server start on: ' + this.port);
        app.listen(this.port);
    }
}

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, resp){

    fs.readFile(__dirname + '/html/home/home.html', function(err, data){
        resp.send(data.toString());
    });
    //resp.send('管理界面');

});

new sync_http_server(4000).init();

//模块导出
//module.exports = sync_http_server;