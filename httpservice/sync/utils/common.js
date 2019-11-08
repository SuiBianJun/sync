var fs = require('fs');
var path = require('path');

var config = require('../config/config');

var common = function(){
    this.fs = fs;
    this.path = path;
    this.config = config;
}

module.exports = new common();