<template>
    <div :class="[dataLength == 0 ? 'empty-sync-dir' : 'empty-sync-dir']">
        <div v-if="dataLength == 0" class="empty-sync-dir">
            <!-- 未配置同步文件夹 -->
            <div class="icon-center" @click.prevent="addSyncDirModal()">
                <Icon type="ios-add-circle" />添加同步文件夹
            </div>
                
        </div>

        <div v-if="dataLength != 0">
            <div @click="showDir" style="width: 350px;display: inline-block;">
                <Card :bordered="true" style="width: 350px;" >
                    <p slot="title" style="height: 35px"><Button type="primary" shape="circle">{{syncDirInfoData[0].local_path}}</Button></p>
                    <ul style="list-style: none;">
                        <li>是否为同步文件夹: </li>
                        <li>同步状态: </li>
                        <li>Bucket: </li>
                    </ul>
                </Card>
            </div>
        </div>

        <Modal
            title="添加同步文件夹"
            v-model="modalAddSyncdir"
            :loading="loadingFlag"
            @on-ok="confimAddSyncDir"
            class-name="vertical-center-modal">
            <Input v-model="synDirPath" placeholder="请复制同步文件夹路径到此" style="width: 300px" />
        </Modal>

    </div>

</template>

<script>
import axiosToken from '../js/axiosToken.js'
import notify from '../js/notification'
import router from '../js/router'


export default {
    data: function(){
        return {
            data: {},
            dataLength: 0,
            modalAddSyncdir: false,// 是否显示modal
            synDirPath: '',// 同步文件夹
            loadingFlag: true,// modal关闭是否延迟
            borderFlag: true,// 是否显示list的边框
            syncDirInfoData: ''
        };
    },
    router,
    methods: {
            // 获取[我的同步文件夹]目录
            getAllSyncDir(){
                //localStorage.setItem("accesstoken", "test");
                this.doAjax('/client/syncdir/list', {}, 'get', this.showSyncDir);
            },
            handleAjaxResponse(response, callBackFun){
                // 请求错误
                if(response.status != 200){
                    this.error("我的同步文件夹获取提示", "网络连接错误");
                    var data = {
                        local_path: 'E:\\syncDir',
                        bucket_name: '',
                        synced: '0',
                        md5_path: ''
                    };
                    callBackFun({data: [data]});
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
                    this.error("错误码：" + response.data.code, response.data.msg);
                    return;
                }
            },
            showSyncDir(data){
                // 触发子路由,params传值必须使用 name指定路由
                this.dataLength = data.data.length;
                console.log(data);
                if(this.dataLength == 0){
                    notify.normalNotification(this, "我的同步文件夹获取提示", "未配置同步文件夹");
                }
                this.syncDirInfoData = data.data;
                // 
            },
            addSyncDirModal(){
                console.log('add sync dir');
                this.modalAddSyncdir = true;
            }
            ,
            confimAddSyncDir(){
                // 确定添加同步文件夹
                setTimeout(() => {
                    this.modalAddSyncdir = false;
                    console.log("同步文件夹路径：" + this.synDirPath);

                    this.addSyncDir(this.synDirPath);

                    this.synDirPath = '';

                }, 1000);
            },
            addSyncDir(path){
                this.doAjax('/client/syncdir/add', {path: path}, 'post', ()=>{
                    // 刷新页面
                    router.push({path: '/menuClient/syncdirinfo'});

                    this.getAllSyncDir();
                });
            },
            doAjax(addr, params, method, callBack) {
                switch (method){
                    case 'get': {
                        axiosToken.get(addr, params)
                        .then((response) => {
                            console.log(response);
                            this.handleAjaxResponse(response, callBack);
                            //window.location.assign("/static/html/home/home.html");
                        })// 如果前面处理错误都会进入异常处理
                        .catch((err) => {
                            console.log(err);
                        });
                    }break;
                    case 'post': {
                        axiosToken.post(addr, params)
                        .then((response) => {
                            console.log(response);
                            this.handleAjaxResponse(response, callBack);
                            //window.location.assign("/static/html/home/home.html");
                        })// 如果前面处理错误都会进入异常处理
                        .catch((err) => {
                            console.log(err);
                        });
                    }break;
                }
            },
            error(title, msg){
                notify.requestError(this, title, msg);
            },
            showDir(){
                console.log("show dir");
                router.push({path: '/menuClient/syncDir'});
            }
        },
        created() {
            console.log("menu-client mounted");
            // 请求数据
            this.getAllSyncDir();
        },
}
</script>