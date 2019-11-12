// 全局页面提示弹出框

const notify = function(){}
notify.prototype = {
    // 页面请求错误
    // target 引入iview组件的 vue实例
    requestError: function(target, title, msg){// 请求错误
        target.$Notice.open({
            title: title,
            desc: msg
        });
    },
    // 服务器返回的后台错误
    responseError: function(target, resp){// 服务器返回错误
        target.$Notice.open({
            title: "xx",
            desc: "xx"
        });
    },
    normalNotification: function(target, title, msg){// 普通通知
        target.$Notice.open({
            title: title,
            desc: msg
        });
    }
}
export default new notify()