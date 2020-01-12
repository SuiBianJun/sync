<template>
    <Layout>
        <Content :style="{padding: '10px 50px'}">
            <Breadcrumb>
                <BreadcrumbItem to="/menuClient/syncdirinfo">
                    <Button type="primary" shape="circle">返回</Button>
                    <Button type="primary" shape="circle">{{currentPath}}</Button>
                </BreadcrumbItem>
            </Breadcrumb>
            <Card style="margin-top: 10px;">
                <div style="min-height: 200px;">
                    <Tree :data="syncDir" show-checkbox multiple></Tree>
                    <Modal v-model="modalFlag" title="请稍等" :mask-closable="false">
                        <div>
                            xx文件上传中...
                        </div>
                        <!-- <div slot="footer">
                            <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button>
                        </div> -->
                    </Modal>
                </div>
            </Card>
        </Content>
    </Layout>
</template>

<script>
import axiosToken from '../js/axiosToken.js'
import store from '../js/store'
import notify from '../js/notification'
export default {
    data(){
        return {
            syncDir: [],
            syncDirTree: [],
            modalFlag: false,
            currentPath: ''
        };
    },
    store,
    methods: {
        getSubDirTree(dirData, tempTree, children){// return []
        //debugger;
            for(var i = 0; i < dirData.length; i++){
                if(children == 1){
                    if(tempTree.children == undefined){
                        tempTree.children = [];
                    }
                    tempTree.children.push({
                        title: dirData[i].name,
                        render: this.getRender({
                            sync_state: dirData[i].sync_state,
                            type: dirData[i].type,
                            path: dirData[i].path
                        }),
                    });

                }else{
                    tempTree.push({
                        title: dirData[i].name,
                        render: this.getRender({
                            sync_state: dirData[i].sync_state,
                            type: dirData[i].type,
                            path: dirData[i].path
                        }),
                    });
                }
            }
            for(var i = 0; i < dirData.length; i++){
                if(children == 0){
                    if(dirData[i].type == 1){
                        this.getSubDirTree(dirData[i].dirs, this.syncDirTree[i], 1);
                    }
                }else{
                    if(dirData[i].type == 1){
                        this.getSubDirTree(dirData[i].dirs, tempTree.children[i], 1);
                    }
                }
            }
        },
        getRender(fileInfo){
            /* var file = {
                sync_state: ''
            } */
            var treeInfo = this.getTreeInfo(fileInfo);

            return (h, { root, node, data }) => {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '90%',
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: treeInfo.iconType
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            //marginRight: '32px'
                        }
                    }, [
                        h('Icon', {
                            props: {
                                size: 22,
                                type: treeInfo.buttonType
                            },
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => {}
                            }
                        })
                    ])
                ]);
            }
        },
        getTreeInfo(file){

            var info = {};

            switch (file.sync_state){
                case 'upload': {
                    info.buttonType = 'md-cloud-upload';
                    info.buttonTitle = '上传';
                }break;
                case 'download': {
                    info.buttonType = 'md-cloud-download';
                    info.buttonTitle = '下载';
                }break;
                case 'sync': {
                    info.buttonType = 'md-sync';
                    info.buttonTitle = '同步';
                }break;
                case 'done': {
                    info.buttonType = 'md-cloud-done';
                    info.buttonTitle = '就绪';
                }break;
            }

            if(file.type == 1){
                info.iconType = 'ios-folder';
            }else{
                info.iconType = 'ios-document-outline';
            }

            return info;
        },
        getTreeButtonOnFunction(file){

            switch (file.sync_state){
                case 'upload': {
                    return (root, node, data) => {
                        console.log(root);
                        console.log(node);
                        console.log(data);
                        // 上传处理
                        console.log('upload: ' + file.path);

                        this.modalFlag = true;

                        // 上传结果反馈
                        // 发起文件上传请求

                        // 最长时延（大文件呢？）
                        setTimeout(() => {
                            this.modalFlag = false;
                            // 操作完成修改icon
                            this.setRender(data, file);

                            this.$Notice.open({
                                title: "文件上传提示",
                                desc: "文件xx上传成功"
                            });
                        }, 3000);
                    }
                }break;
                case 'download': {
                }break;
                case 'sync': {
                    // 
                    return (root, node, data) => {
                        console.log(root);
                        console.log(node);
                        console.log(data);
                        // 上传处理
                        console.log('upload: ' + file.path);

                        // 操作完成修改icon
                        this.setRender(data, file);
                    }
                }break;
                case 'done': {
                }break;
            }
        },
        setRender(data, file){

            var treeInfo = this.getTreeInfo(file);
            treeInfo.buttonType = 'md-cloud-done';
            treeInfo.buttonTitle = '就绪';

            data.render = (h, { root, node, data }) => {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '90%',
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: treeInfo.iconType
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: treeInfo.buttonType,
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            attrs: {
                                title: treeInfo.buttonTitle,
                            },
                            on: {
                                //click: () => { this.getTreeButtonOnFunction(fileInfo)(root, node, data) }
                            }
                        })
                    ])
                ]);
            }
        },
        handleAjaxResponse(response, callBackFun){
            // 请求错误
            if(response.status != 200){

                callBackFun({
                    data: {
                        dirs: [
                            {
                                name: "a.txt",
                                sync_state: 'upload'
                            }
                        ]
                    }
                });

                this.error("我的同步文件夹获取提示", "网络连接错误");
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
        showSyncDir(result){
            console.log(result);
            this.getSubDirTree(result.data.dirs, this.syncDirTree, 0);
            this.syncDir = this.syncDirTree;
        },
        error(title, msg){
            notify.requestError(this, title, msg);
        },
    },
    mounted() {
        // 请求syncDir数据
        console.log('create my-sync-dir')
        console.log("currentSyncDir: " + store.state.currentSyncDirPath);
        if(store.state.currentSyncDirPath == ''){
            return;
        }
        this.currentPath = store.state.currentSyncDirPath;
        this.doAjax('/client/syncdir/content', {path: store.state.currentSyncDirPath}, 'get', this.showSyncDir);
        
    },
}
</script>