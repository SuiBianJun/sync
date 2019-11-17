<template>
    <div :class="[dataLength == 0 ? 'empty-sync-dir' : 'empty-sync-dir']">
        <div v-if="dataLength == 0" class="empty-sync-dir">
            <!-- 未配置同步文件夹 -->
            <div class="icon-center" @click.prevent="addSyncDirModal()">
                <Icon type="ios-add-circle" />添加同步文件夹
            </div>
                
        </div>

        <div v-if="dataLength != 0">
            <div v-for="item in syncDirInfoData" :key="item.local_path" style="width: 350px;display: inline-block;">
                <Card :bordered="true" style="width: 350px;" >
                    <p slot="title" style="height: 35px">
                        <Button type="primary" shape="circle" style="font-weight: 600" @click="showDir(item.local_path)" >{{item.local_path}}</Button>
                        <Dropdown style="float: right; height: 35px;line-height: 35px;" :stop-propagation="sp" @on-click="deleteSyncDir(item.local_path)">
                            <Icon type="ios-arrow-down"></Icon>
                            <DropdownMenu slot="list">
                                <DropdownItem name='delete'>删除</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </p>
                    <ul style="list-style: none;">
                        <li>是否为同步文件夹: </li>
                        <li>同步状态: </li>
                        <li>Bucket: {{item.bucket_name}}
                            <span v-show="item.bucket_name == ''" @click.stop.prevent="addBucket(item.local_path)" class="hover-class">
                                <Icon type="ios-add-circle" />
                            </span>
                        </li>
                    </ul>
                </Card>
            </div>
            <div class="hover-class" style="width: 350px;display: inline-block;line-height: 129px;vertical-align: top;" @click.prevent="addSyncDirModal()">
                <Card :bordered="true" style="width: 350p; text-align: center">
                    <Icon type="ios-add-circle" />添加同步文件夹
                </Card>
            </div>
        </div>

        <Modal
            title="添加同步文件夹"
            v-model="modalAddSyncdir"
            :loading="loadingFlag"
            @on-ok="confimAddSyncDir"
            class-name="">
            <Input v-model="synDirPath" placeholder="请复制同步文件夹路径到此" style="width: 300px" />
        </Modal>

        <Modal
            title="关联Bucket"
            v-model="modalAddBucket"
            :loading="loadingFlag"
            @on-ok="confimAddBucket"
            class-name="">
            <Select v-model="selectBucket" style="width:200px">
                <Option v-for="item in bucketList" :value="item.name" :key="item.name">{{ item.name }}</Option>
            </Select>
        </Modal>

        <Modal
            title="删除同步文件夹"
            v-model="modalDeleteSyncDir"
            :loading="loadingFlag"
            @on-ok="confimDeleteSyncDir"
            class-name="">
            <p>确定删除同步文件夹：{{currentSyncDir}}</p>
        </Modal>

    </div>

</template>

<script>
import axiosToken from '../js/axiosToken.js'
import notify from '../js/notification'
import router from '../js/router'
import store from '../js/store'

export default {
    data: function(){
        return {
            data: {},
            dataLength: 0,
            modalAddSyncdir: false,// 是否显示modal
            modalAddBucket: false,
            synDirPath: '',// 同步文件夹
            loadingFlag: true,// modal关闭是否延迟
            borderFlag: true,// 是否显示list的边框
            syncDirInfoData: '',
            bucketName: '',
            bucketList: [{name: 'bucket-1'}],
            selectBucket: '',
            currentSyncDir: '',
            sp: true,
            modalDeleteSyncDir: false,

        };
    },
    store,
    router,
    methods: {
        confimDeleteSyncDir(){
            this.doAjax('/client/syncdir/delete', {
                dir: this.currentSyncDir
            }, 'post', (data) => {
                console.log(data);
                console.log('同步文件夹删除成功');
                setTimeout(()=>{
                    this.modalDeleteSyncDir = false;
                    router.push({path: '/menuClient/syncdirinfo'});
                    this.getAllSyncDir();
                }, 1000);
            });
        },
        deleteSyncDir(dir){
            console.log('delete syncdir');
            this.modalDeleteSyncDir = true;
            this.currentSyncDir = dir;
        },
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
                    bucket: '',
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
        showDir(path){
            console.log("show dir");
            store.commit('setCurrentSyncDirPath', path);// 同步方法
            router.push({ path: '/menuclient/contentsyncdir'});
        },
        addBucket(dir){
            console.log('add bucket');

            // 请求可用的bucket
            this.doAjax('/client/bucket/unusedBucket', {}, 'get', (data) => {
                this.modalAddBucket = true;
                this.currentSyncDir = dir;// 即将绑定的syncdir
                this.bucketList = data.data;
            });
        },
        confimAddBucket(){
            setTimeout(() => {
                this.modalAddBucket = false;
                this.addSyncDirBucket(this.selectBucket);
                this.selectBucket = '';
            }, 1000);
        },
        addSyncDirBucket(bucket){
            this.doAjax('/client/syncdir/relateBucket', {
                dir: this.currentSyncDir,
                bucket: bucket
            }, 'post', () => {
                router.push({path: '/menuClient/syncdirinfo'});
                this.getAllSyncDir();
            });
        }
    },
    created() {
        console.log("menu-client mounted");
        // 请求数据
        this.getAllSyncDir();
    },
}
</script>