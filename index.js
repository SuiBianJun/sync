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

// 初始化之后开始同步
function startSync(){
    var watcher = chokidar.watch('E:/syncDir', {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true
      });
    
    var log = console.log.bind(console);
    
    // 文件添加、修改、删除
    watcher
    .on('add', function(path){fileAdd(path)})
    .on('change', function(path){fileChange(path)})
    .on('unlink', function(path){fileDelete(path)});
    
    // 文件夹添加、删除
    watcher
    .on('addDir', path => log(`Directory ${path} has been added`))
    .on('unlinkDir', path => log(`Directory ${path} has been removed`))
    .on('error', error => log(`Watcher error: ${error}`))
    .on('ready', () => log('Initial scan complete. Ready for changes'))
    .on('raw', (event, path, details) => { // internal
    log('Raw event info:', event, path, details);
    });
}

function fileAdd(path){
    console.log("fileAdd: " + path);    
}

function fileChange(path){
  console.log("fileChange: " + path);    
}

function fileDelete(path){
  console.log("fileDelete: " + path);    
}
