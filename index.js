var chokidar = require('chokidar');
var fs = require('fs');

var sync_http_server = require(__dirname + '/httpserver/server.js');

init();

var http_server = new sync_http_server(3000);
http_server.init();

//初始化、检查
function init(){
    fs.readFile(__dirname + '/config/config.json', function(err, data){
        if(err){
            console.log(err);
        }
        var config = JSON.parse(data.toString());
        //console.log(config);
    });
}
