// 全局页面提示弹出框

const notify = function(){}
notify.prototype = {
    // 页面请求错误
    // target 引入iview组件的 vue实例
    requestError: function(target, title, msg){
        target.$Notice.open({
            title: title,
            desc: msg
        });
    },
    // 服务器返回的后台错误
    responseError: function(target, resp){
        target.$Notice.open({
            title: "xx",
            desc: "xx"
        });
    }
}
export default new notify()