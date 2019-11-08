<template>
<div id="content">
    <div id="menu-content">
        <Menu active-name="1">
            <MenuItem name="1">
                <Icon type="ios-paper" />
                我的同步文件夹
            </MenuItem>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-analytics" />
                    Bucket管理
                </template>
                    <MenuItem name="2-1">Option 1</MenuItem>
                    <MenuItem name="2-2">Option 2</MenuItem>
            </Submenu>
        </Menu>
    </div>

    <div id="right-content">
        <router-view name="rightContent"></router-view>
    </div>
</div>
</template>
<script>
// ????
import axiosToken from '../js/axiosToken.js'

    export default {
        data: function(){
            return {

            };
        },
        methods: {
            // 获取[我的同步文件夹]目录
            getAllSyncDir(){

                //localStorage.setItem("accesstoken", "test");

                axiosToken.get('/client/syncdir/list', {
                    //accessId: "test"
                })
                .then((response) => {
                    console.log(response);
                    this.handleAjaxResponse(response, this.showSyncDir);
                    //window.location.assign("/static/html/home/home.html");
                })// 如果前面处理错误都会进入异常处理
                .catch((err) => {
                    console.log(err);
                });
            },
            handleAjaxResponse(response, callBackFun){
                // 请求错误
                if(response.status != 200){
                    this.$parent.error("我的同步文件夹获取提示", "网络连接错误");
                    callBackFun({client: []});
                    return;
                }
                if(response.data.code == 0){
                    callBackFun(response.data);
                }else if(response.data.code == 301){// token失效
                    console.log("redirective");

                    this.$Message.info({
                        content: 'Token已失效，请重新登录。',
                        duration: 2
                    });
                    setTimeout(function(){
                        window.location.assign(response.data.data.location);
                    }, 3000);
                }else{
                    this.$parent.error("错误码：" + response.data.code, response.data.msg);
                    return;
                }
            },
            showSyncDir(data){
                // 触发子路由,params传值必须使用 name指定路由
                this.$parent.changeRouter({name: 'menuclientcontent', params: {
                    data: data
                }});
            }
        },
        mounted() {
            console.log("menu-client mounted");
            // 请求数据
            this.getAllSyncDir();
        },
    }
</script>