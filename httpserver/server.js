var express = require('express');
var app = express();

function sync_http_server(port){
    this.port = port;
}

sync_http_server.prototype = {
    init: function(){
        console.log('sync http server start on: ' + this.port);
        app.listen(this.port);
    }
}

app.get('/', function(req, resp){

    resp.send('管理界面');

});

module.exports = sync_http_server;