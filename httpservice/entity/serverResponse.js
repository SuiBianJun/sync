// 服务器错误处理

var ServerResponse = function(code, msg){
    this.code = code;
    this.msg = msg;
}

ServerResponse.prototype = {
    ok(data=null){
        this.code = 0;
        this.msg = "操作成功";
        if(data != null)
            this.data = data;
        return JSON.stringify(this);
    },
    failed(data=null, msg="操作失败"){
        this.code = 1;
        this.msg = msg;
        if(data != null)
            this.data = data;
        return JSON.stringify(this);
    },
    redirect(data=null){
        this.code = 301;
        this.msg = "操作失败";
        if(data != null)
            this.data = data;
        return JSON.stringify(this);
    }
}

module.exports = ServerResponse;