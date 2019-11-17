<template>
    <div :class="'empty-sync-dir'">
        <div v-for="item in buckets" :key="item.bucket" style="width: 350px;display: inline-block;">
            <Card :bordered="true" style="width: 350px;" >
                <p slot="title" style="height: 35px;">
                    <Button type="primary" shape="circle" style="font-weight: 600">{{item.bucket}}</Button>
                    <Dropdown style="float: right; height: 35px;line-height: 35px;" :stop-propagation="sp" @on-click="deleteBucket(item.bucket)">
                        <Icon type="ios-arrow-down"></Icon>
                        <DropdownMenu slot="list">
                            <DropdownItem name='delete'>删除</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </p>
                <ul style="list-style: none;">
                    <li>是否为空bucket: </li>
                    <li>同步文件夹路径: {{item.syncdir}}<span v-show="item.syncdir == ''" @click.stop.prevent="addSyncDir(item.bucket)" class="hover-class"><Icon type="ios-add-circle" /></span></li>
                    <li>状态: </li>
                </ul>
            </Card>
        </div>
        <div class="hover-class" style="width: 350px;display: inline-block;line-height: 129px;vertical-align: top;" @click.prevent="addBucket()">
            <Card :bordered="true" style="width: 350p; text-align: center">
                <Icon type="ios-add-circle" />添加服务器Bucket
            </Card>
        </div>

        <Modal
            title="添加服务器Bucket"
            v-model="modalAddBucket"
            :loading="loadingFlag"
            @on-ok="confimAddBucket"
            class-name="">
            <Input v-model="bucketName" placeholder="请输入Bucket" style="width: 300px" />
        </Modal>
        <Modal
            title="关联同步文件夹"
            v-model="modalAddSyncDir"
            :loading="loadingFlag"
            @on-ok="confimAddSyncDir"
            class-name="">
            <Select v-model="selectSyncDir" style="width:200px">
                <Option v-for="item in syncDirList" :value="item.name" :key="item.name">{{ item.name }}</Option>
            </Select>
        </Modal>

        <Modal
            title="删除Bucket"
            v-model="modalDeleteBucket"
            :loading="loadingFlag"
            @on-ok="confimDeleteBucket"
            class-name="">
            <p>确定删除同步文件夹：{{currentBucketName}}</p>
        </Modal>

    </div>
</template>

<script>
import router from '../js/router'
import axiosToken from '../js/axiosToken'
import notify from '../js/notification'

export default {
    data(){
        return {
            buckets: [],
            loadingFlag: true,
            modalAddBucket: false,
            bucketName: '',
            currentBucketName: '',
            modalAddSyncDir: false,
            selectSyncDir: '',
            syncDirList: [{name: 'E:\\syncDir'}],
            modalDeleteBucket: false,
            sp: true

        };
    },
    router,
    methods: {
        confimDeleteBucket(){

            this.doAjax('/client/bucket/delete', {
                bucket: this.currentBucketName
            }, 'post', () => {
                setTimeout((data) => {
                    this.modalDeleteBucket = false;
                    router.push({path: '/menuclient/bucketinfo'});
                    this.doAjax('/client/bucket/list', {}, 'get', this.showBucketInfo);
                }, 1000);
            });

        },
        deleteBucket(bucket){
            this.currentBucketName = bucket;
            this.modalDeleteBucket = true;
        },
        handleAjaxResponse(response, callBackFun){
            // 请求错误
            if(response.status != 200){
                this.error("Bucket获取提示", "网络连接错误");

                callBackFun({
                    data: [{
                        bucket: "bucket1",
                        syncdir: '',
                        empty: '1'
                        }]
                    }
                );

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
        doAjax(addr, params, method, callBack) {
            console.log(params);
            switch (method){
                case 'get': {
                    axiosToken.get(addr, {
                        params: params
                    })
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
        showBucketInfo(data){
            this.buckets = data.data;
        },
        addBucket(){
            this.modalAddBucket = true;
        },
        confimAddBucket(){
            this.doAjax('/client/bucket/add', {bucket: this.bucketName}, 'post', () => {
                this.modalAddBucket = false;
                router.push({path: '/menuclient/bucketinfo'});
                this.doAjax('/client/bucket/list', {}, 'get', this.showBucketInfo);
            });
        },
        addSyncDir(bucket){
            this.currentBucketName = bucket;
            this.modalAddSyncDir = true;
        },
        confimAddSyncDir(){
            setTimeout(() => {
                this.modalAddSyncDir = false;
                this.addDir(this.selectSyncDir);
                this.selectSyncDir = '';
            }, 1000);
        },
        addDir(dir){
            this.doAjax('/client/bucket/relateSyncDir', {
                bucket: this.currentBucketName,
                dir: dir
            }, 'post', () => {
                router.push({path: '/menuclient/bucketinfo'});
                this.doAjax('/client/bucket/list', {}, 'get', this.showBucketInfo);
            });
        },
        error(title, msg){
            notify.requestError(this, title, msg);
        },
    },
    mounted() {
        // 请求bucket 数据
        this.doAjax('/client/bucket/list', {}, 'get', this.showBucketInfo);
    },
}
</script>