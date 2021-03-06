var chokidar = require('chokidar');
var fs = require('fs');

var sync = function(){

    this.initFlag = false;
    this.initDir = {
        md5: '',
        sync_dir_path: '',
    };
}

// 初始化之后开始同步
sync.prototype = {
    startSync: function(){
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
        .on('unlinkDir', path => log(`Directory ${path} has been removed`));

        // 错误
        watcher.on('error', error => log(`Watcher error: ${error}`));

        // 第一次启动检查
        watcher.on('ready', function(){
            this.initFlag = true;
            syncReady();
        });

        // 
        watcher.on('raw', (event, path, details) => { // internal
            log('Raw event info:', event, path, details);
        });
    }
    
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

function syncReady(){

}

var sync_app = new sync();
sync_app.startSync();

module.exports = sync;