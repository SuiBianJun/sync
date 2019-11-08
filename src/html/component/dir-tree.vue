<template>
    <div id="dirtree">
        <Tree :data="data1"></Tree>
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
            dirTree: []
        };
    },
    methods: {
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
        }
    },
    created() {
        // 读取文件夹数据
        // /var/syncdir
        var dirData = {
            name: '/var/syncdir',
            dirs: [
                {
                    type: 1,
                    name: 'a',// /var/syncdir/a
                    dirs: [
                        {
                            type: 0,
                            name: 'a.txt'// /var/syncdir/a/a.txt
                        },
                        {
                            type: 0,
                            name: 'a2.txt'// /var/syncdir/a/a2.txt
                        }
                    ]
                },
                {
                    type: 1,
                    name: 'b',// /var/syncdir/b
                    dirs: [
                        {
                            type: 0,
                            name: 'b.txt'// /var/syncdir/b/b.txt
                        },
                        {
                            type: 0,
                            name: 'b2.txt'// /var/syncdir/b/b2.txt
                        },
                        {
                            type: 1,
                            name: 'b2',// /var/syncdir/a/b
                            dirs: [
                                {
                                    type: 1,
                                    name: 'b3',// /var/syncdir/b/b/b3.txt
                                    dirs: [
                                        {
                                            type: 1,
                                            name: 'b4',
                                            dirs: [
                                                {
                                                    type: 1,
                                                    name: 'b5',
                                                    dirs: [
                                                        {
                                                            type: 0,
                                                            name: 'b6.txt',
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

    },
}
</script>