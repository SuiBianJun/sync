var md5File = require('md5-file');
var md5Dir = require('md5-dir');

var MD5 = function(){}

MD5.prototype = {
    getFile: function(path){
        return md5File.sync(path);
    },
    getDir: function(path){
        return md5Dir.sync(path);
    }
}

//console.log(new MD5().getDir('E:\\syncDir')); 

module.exports = new MD5()