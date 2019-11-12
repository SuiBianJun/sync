文件同步程序

    删除、新增操作多，修改操作少
    文件夹层次低
    非自动同步

项目结构：
    
    src: 前端代码
    httpservice: nodejs服务器 


1、同步文件夹与Bucket
    
    一个同步文件夹对应一个Bucket， 但一个Bucket可以对应多个文件夹

        如果是文件夹添加Bucket
            如果文件夹非空，那么当前Bucket必须是空闲的

        如果是Bucket添加文件夹，那么该文件夹的Bucket只能是当前的Bucket的（同一台主机上的一个文件夹只能对应一个Bucket）

2、md5.json文件

    用于检查文件夹中文件的变更
    var dirData = {
        path: '/var/syncDir/',
        md5s:[
            {
                type: 1,
                path: 'a',
                md5: ''
            },
            {
                type: 1,
                path: 'b',
                md5: ''
            },
            {
                type: 0,
                path: 'c.txt',
                md5: ''
            },
            {
                type: 1,
                path: 'a/a2.txt',
                md5: ''
            },
            {
                type: 1,
                path: 'b/b2.txt',
                md5: ''
            }
        ]
    }

    新建的空同步文件夹：md5文件字段md5s长度为0
        添加文件后 返回页面请求前先计算一遍同步文件夹
        添加Bucket，上传文件时，将同步的文件加入MD5文件，并传输到Bucket中
        对于未同步的文件提示未同步

    从Bucket同步文件到本地
        文件同步完成后，添加从Bucket获取的MD5文件

    