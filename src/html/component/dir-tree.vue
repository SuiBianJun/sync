<template>
    <div id="dirtree">
        <Tree :data="data1"></Tree>
        <hr>
        <Tree :data="data2"></Tree>
        <hr>
        <Tree :data="data3" ref='tree' show-checkbox multiple></Tree>
        <button @click="getNodes">获取节点</button>
        <Modal v-model="modalFlag" title="请稍等" :mask-closable="false">
            <div>
                xx文件上传中...
            </div>
            <div slot="footer">
                <!-- <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button> -->
            </div>
        </Modal>
        <!-- 删除提示 -->
        <Modal v-model="modalDelete" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
            </p>
            <div style="text-align:center">
                该操作将删除远程文件系统上的文件，是否继续执行？
            </div>
            <div slot="footer">
                <Button type="error"  @click="cancelDelete">取消</Button>
                <Button type="error"  @click="confirmDelete">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data1: [
                {
                    title: 'parent 1',
                    expand: true,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-1-1'
                                },
                                {
                                    title: 'leaf 1-1-2'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-2',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-2-1'
                                },
                                {
                                    title: 'leaf 1-2-1'
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'parent 2'
                }
            ],
            dirTree: [],
            data2: [
                {
                    title: 'parent 1',
                    expand: true,
                    render: (h, { root, node, data }) => {
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%'
                            }
                        }, [
                            h('span', [
                                h('Icon', {
                                    props: {
                                        type: 'ios-folder'
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
                                        icon: 'md-cloud-download'
                                    }),
                                    style: {
                                        marginRight: '8px'
                                    },
                                    attrs: {
                                        title: '下载所有'
                                    },
                                    on: {
                                        click: () => { this.append(data) }
                                    }
                                }),
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'md-cloud-upload'
                                    }),
                                    style: {
                                        marginRight: '8px'
                                    },
                                    on: {
                                        click: () => { this.append(data) }
                                    }
                                }),
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'md-sync'
                                    }),
                                    style: {
                                        marginRight: '8px'
                                    },
                                    on: {
                                        click: () => { this.append(data) }
                                    }
                                })
                            ]),
                        ]);
                    },
                    children: [
                        {
                            title: 'child 1-1',
                            expand: true,
                            render: (h, { root, node, data }) => {
                                return h('span', {
                                    style: {
                                        display: 'inline-block',
                                        width: '100%'
                                    }
                                }, [
                                    h('span', [
                                        h('Icon', {
                                            props: {
                                                type: 'ios-folder-outline'
                                            },
                                            style: {
                                                marginRight: '8px'
                                            }
                                        }),
                                        h('span', data.title)
                                    ])
                                ]);
                            },
                            children: [
                                {
                                    title: 'leaf 1-1-1',
                                    expand: true,
                                    render: (h, { root, node, data }) => {
                                        return h('span', {
                                            style: {
                                                display: 'inline-block',
                                                width: '100%'
                                            }
                                        }, [
                                            h('span', [
                                                h('Icon', {
                                                    props: {
                                                        type: 'ios-document-outline',
                                                        color: 'red'
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
                                                        icon: 'md-cloud-download'
                                                    }),
                                                    style: {
                                                        marginRight: '8px'
                                                    },
                                                    on: {
                                                        click: () => { this.append(data) }
                                                    }
                                                })
                                            ])
                                        ]);
                                    },

                                },
                                {
                                    title: 'leaf 1-1-2',
                                    expand: true,
                                    render: (h, { root, node, data }) => {
                                        return h('span', {
                                            style: {
                                                display: 'inline-block',
                                                width: '100%'
                                            }
                                        }, [
                                            h('span', [
                                                h('Icon', {
                                                    props: {
                                                        type: 'ios-paper-outline'
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
                                                h('Icon', {
                                                    props: Object.assign({}, {
                                                        type: 'md-cloud-done',
                                                        size: 22,
                                                        color: 'green'
                                                    }, {
                                                    }),
                                                    style: {
                                                        marginRight: '8px'
                                                    },
                                                    on: {
                                                        click: () => { console.log('done') }
                                                    }
                                                })
                                            ])
                                        ]);
                                    },
                                }
                            ]
                        },
                        {
                            title: 'child 1-2',
                            expand: true,
                            render: (h, { root, node, data }) => {
                                return h('span', {
                                    style: {
                                        display: 'inline-block',
                                        width: '100%'
                                    }
                                }, [
                                    h('span', [
                                        h('Icon', {
                                            props: {
                                                type: 'ios-folder-outline'
                                            },
                                            style: {
                                                marginRight: '8px'
                                            }
                                        }),
                                        h('span', data.title)
                                    ])
                                ]);
                            },
                            children: [
                                {
                                    title: 'leaf 1-2-1',
                                    expand: true,
                                    render: (h, { root, node, data }) => {
                                        return h('span', {
                                            style: {
                                                display: 'inline-block',
                                                width: '100%'
                                            }
                                        }, [
                                            h('span', [
                                                h('Icon', {
                                                    props: {
                                                        type: 'ios-paper-outline'
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
                                                h('Icon', {
                                                    props: Object.assign({}, {
                                                        type: 'md-trash',
                                                        size: 22,
                                                        color: 'red'
                                                    }, {
                                                    }),
                                                    style: {
                                                        marginRight: '8px'
                                                    },
                                                    on: {
                                                        click: () => { 
                                                            this.treeDeleteNode = {root, node, data};
                                                            this.deleteTreeNode() }
                                                    }
                                                })
                                            ])
                                        ]);
                                    },
                                },
                                {
                                    title: 'leaf 1-2-1',
                                    expand: true,
                                    render: (h, { root, node, data }) => {
                                        return h('span', {
                                            style: {
                                                display: 'inline-block',
                                                width: '100%'
                                            }
                                        }, [
                                            h('span', [
                                                h('Icon', {
                                                    props: {
                                                        type: 'ios-paper-outline'
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
                                                        icon: 'md-sync',
                                                    }),
                                                    style: {
                                                        marginRight: '8px'
                                                    },
                                                    attrs: {
                                                        title: '更新',
                                                    },
                                                    on: {
                                                        click: () => { this.append(root, node, data) }
                                                    }
                                                })
                                            ])
                                        ]);
                                    },
                                }
                            ]
                        }
                    ]
                }
            ],
            data3: [],
            dirTree3: [],
            buttonProps: {
                type: 'default',
                size: 'small',
            },
            modalFlag: false,
            modalDelete: false,
            treeDeleteNode: {}// 删除节点的数据
            
        };
    },
    methods: {
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: 'ios-paper-outline'
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
                            icon: 'md-cloud-upload'
                        }),
                        style: {
                            marginRight: '8px'
                        },
                        on: {
                            click: () => { this.append(data) }
                        }
                    })
                ])
            ]);
        },
        append (root, node, data) {

            console.log(root);
            console.log(node);
            console.log(data);

            // 右侧弹窗提示操作进度
            
            data.render = (h, { root, node, data }) => {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
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
                                icon: 'md-cloud-done',
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            attrs: {
                                title: '就绪',
                            },
                            on: {
                                //click: () => { this.append(root, node, data) }
                            }
                        })
                    ])
                ]);
            }

            const children = data.children || [];
            children.push({
                title: 'appended node',
                expand: true
            });
            this.$set(data, 'children', children);
        },
        getSubDirTree(dirs, index, flag){// return []
            for(var i = 0; i < dirs.length; i++){
                if(dirs[i].type == 1){
                    // 递归
                    this.dirTree[i] = {};
                    this.dirTree[i].title = dirs[i].name;
                    this.getSubDirTree(dirs[i].dirs, i, 1);
                }else if(dirs[i].type == 0){// 文件
                    if(flag == 0){
                        this.dirTree.push({
                            title: dirs[i].name
                        });
                    }else if(flag == 1){
                        this.dirTree[index].children = [];
                        this.dirTree[index].children.push({
                            title: dirs[i].name
                        });
                    }
                }
            }
        },
        getSubDirTree2(dirData, tempTree, children){// return []
        //debugger;
            for(var i = 0; i < dirData.length; i++){
                if(children == 1){
                    if(tempTree.children == undefined){
                        tempTree.children = [];
                    }
                    tempTree.children.push({
                        title: dirData[i].name
                    });

                }else{
                    tempTree.push({
                        title: dirData[i].name
                    });
                }
            }
            for(var i = 0; i < dirData.length; i++){
                if(children == 0){
                    if(dirData[i].type == 1){
                        this.getSubDirTree2(dirData[i].dirs, this.dirTree[i], 1);
                    }
                }else{
                    if(dirData[i].type == 1){
                        this.getSubDirTree2(dirData[i].dirs, tempTree.children[i], 1);
                    }
                }
            }
        },
        getSubDirTree3(dirData, tempTree, children){// return []
        //debugger;
            for(var i = 0; i < dirData.length; i++){
                if(children == 1){
                    if(tempTree.children == undefined){
                        tempTree.children = [];
                    }
                    tempTree.children.push({
                        title: dirData[i].name,
                        path: 'path',
                        type: dirData[i].type,
                        sync_state: dirData[i].sync_state,
                        render: this.getRender({
                            sync_state: dirData[i].sync_state,
                            type: dirData[i].type,
                            path: dirData[i].path
                        }),
                        disabled: dirData[i].sync_state == 'done' ? true : false
                    });

                }else{
                    tempTree.push({
                        title: dirData[i].name,
                        path: 'path',
                        type: dirData[i].type,
                        sync_state: dirData[i].sync_state,
                        render: this.getRender({
                            sync_state: dirData[i].sync_state,
                            type: dirData[i].type,
                            path: dirData[i].path,
                        }),
                        //disabled: dirData[i].sync_state == 'done' ? true : false
                    });
                }
            }
            for(var i = 0; i < dirData.length; i++){
                if(children == 0){
                    if(dirData[i].type == 1){
                        this.getSubDirTree3(dirData[i].dirs, this.dirTree3[i], 1);
                    }
                }else{
                    if(dirData[i].type == 1){
                        this.getSubDirTree3(dirData[i].dirs, tempTree.children[i], 1);
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
                        width: '100%',
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
                        fileInfo.sync_state == 'done' ? 
                        h('Icon', {
                            props: Object.assign({}, {
                                type: 'md-cloud-done',
                                size: 22,
                                color: 'green'
                            }, {
                            }),
                            style: {
                                marginRight: '8px',
                                visibility: (fileInfo.type == 1) ? 'hidden' : 'visible'
                            },
                            on: {
                                click: () => { console.log('done') }
                            }
                        }) : 
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: treeInfo.buttonType,
                            }),
                            style: {
                                marginRight: '8px',
                                // 如果是文件夹，并且sync_state为done,则不用再显示 图标
                                visibility: (fileInfo.type == 1 && fileInfo.sync_state == 'done') ? 'hidden' : 'visible'
                            },
                            attrs: {
                                title: treeInfo.buttonTitle,
                            },
                            on: {
                                click: () => { this.getTreeButtonOnFunction(fileInfo)(root, node, data) }
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
                        width: '100%',
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
        getNodes: function () {// 获取批量选中的节点，并进行相应的操作，，如果某项操作失败，进行提示
            console.log(this.$refs.tree.getCheckedNodes());
            var nodes = this.$refs.tree.getCheckedNodes();
            // 修改 render 和 select
            //nodes[0].render = 
            nodes.forEach(element => {
                this.setDoneRender(element);
            });
        },
        setDoneRender(data){// 设置同步完成后的状态
            data.render = (h, { root, node, data }) => {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%',
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: data.type == 1 ? 'ios-folder' : 'ios-document-outline'
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
                        h('Icon', {
                            props: Object.assign({}, {
                                type: 'md-cloud-done',
                                size: 22,
                                color: 'green'
                            }, {
                            }),
                            style: {
                                marginRight: '8px',
                                visibility: (data.type == 1) ? 'hidden' : 'visible'
                            },
                            on: {
                                click: () => { console.log('done') }
                            }
                        }) 
                    ])
                ]);
            };
            data.disabled = true;
        },
        deleteTreeNode(){
            this.modalDelete = true;
        },
        cancelDelete(){
            this.modalDelete = false;
        },
        confirmDelete(){
            // 执行确认操作
            console.log('delete');
            
            // 删除Tree 组件节点操作
            const parentKey = this.treeDeleteNode.root.find(el => el === this.treeDeleteNode.node).parent;
            const parent = this.treeDeleteNode.root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(this.treeDeleteNode.data);
            parent.children.splice(index, 1);

            this.modalDelete = false;
        }
    },
    created() {
        // 读取文件夹数据
        // /var/syncdir
        var dirData = {
            type: 1,
            root: true,
            name: '/var/syncdir',
            dirs: [
                {
                    type: 1,
                    name: 'a',// /var/syncdir/a
                    path: '/var/syncdir/a',
                    sync_state: 'done',// upload=client new, download=server add, update=server/client modify, delete=client delete 
                    dirs: [
                        {
                            type: 0,
                            sync_state: 'upload',
                            path: '/var/syncdir/a/a.txt',
                            name: 'a.txt'// /var/syncdir/a/a.txt
                        },
                        {
                            type: 0,
                            sync_state: 'sync',
                            path: '/var/syncdir/a/a2.txt',
                            name: 'a2.txt'// /var/syncdir/a/a2.txt
                        }
                    ]
                },
                {
                    type: 1,
                    name: 'b',// /var/syncdir/b
                    sync_state: 'done',
                    path: '/var/syncdir/b',
                    dirs: [
                        {
                            type: 0,
                            sync_state: 'download',
                            path: '/var/syncdir/b/b.txt',
                            name: 'b.txt'// /var/syncdir/b/b.txt
                        },
                        {
                            type: 0,
                            sync_state: 'done',
                            path: '/var/syncdir/b/b2.txt',
                            name: 'b2.txt'// /var/syncdir/b/b2.txt
                        },
                        {
                            type: 1,
                            name: 'b2',// /var/syncdir/a/b
                            sync_state: 'upload',
                            path: '/var/syncdir/b/b2',
                            dirs: [
                                {
                                    type: 1,
                                    sync_state: 'upload',
                                    path: '/var/syncdir/b/b2/b3',
                                    name: 'b3',// /var/syncdir/b/b/b3.txt
                                    dirs: [
                                        {
                                            type: 1,
                                            name: 'b4',
                                            sync_state: 'upload',
                                            path: '/var/syncdir/b/b2/b3/b4',
                                            dirs: [
                                                {
                                                    type: 1,
                                                    name: 'b5',
                                                    path: '/var/syncdir/b/b2/b3/b4/b5',
                                                    sync_state: 'upload',
                                                    dirs: [
                                                        {
                                                            type: 0,
                                                            name: 'b6.txt',
                                                            path: '/var/syncdir/b/b2/b3/b4/b5/b6.txt',
                                                            sync_state: 'upload',
                                                            // dirs: [
                                                            //     {
                                                                    
                                                            //     }
                                                            // ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        // 转换成tree data
        // var treeData = [];
        // var item;
        // for(var i = 0; i < dirData.dirs.length; i++){
        //     item = {};
        //     if(dirData.dirs[i].type == 0){// 文件
        //         item.title = dirData.dirs[i].name;
        //         treeData.push(item);
        //     }else if(dirData.dirs[i].type == 1){// 文件夹
        //         item.title = dirData.dirs[i].name;
        //         this.getSubDirTree(dirData.dirs[i].dirs, 0, 0);
        //         item.children = this.dirTree;
        //         this.dirTree = [];
        //         treeData.push(item);
        //     }
        // }
        //console.log(treeData);
        //this.data1 = treeData;

        this.getSubDirTree2(dirData.dirs, this.dirTree, 0);
        this.data1 = this.dirTree;

        this.getSubDirTree3(dirData.dirs, this.dirTree3, 0);
        this.data3 = this.dirTree3;

    },
}
</script>