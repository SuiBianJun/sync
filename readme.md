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
        path: '/var/syncDir/', // 根目录
        md5s:[// 目录下所有的文件MD5值
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

    用户登录成功即建立MD5文件，成功添加同步文件夹后更新md5文件内容

    新建的空同步文件夹：md5文件字段md5s长度为0
        添加文件后 返回页面请求前先计算一遍同步文件夹
        添加Bucket，上传文件时，将同步的文件加入MD5文件，并传输到Bucket中
        对于未同步的文件提示未同步

    从Bucket同步文件到本地
        文件同步完成后，添加从Bucket获取的MD5文件


3、对于空文件夹添加Bucket的情况，相当于去同步远程文件到本地

    必须先将远程文件夹同步一次到本地后才能操作？？，，直接自动同步，防止用户直接进入文件夹先建立文件


4、文件冲突：远程文件在客户端最近一次的更新与远程服务器上的文件不一致
    
    上传文件之前请求远程服务器上的MD5文件，先检查当前的客户端上的MD5文件中对应文件的MD5值与远程服务器上的对应文件MD5值是否相等，如果不相等，说明存在冲突
        冲突解决：只能先同步远程文件到本地文件，然后再加入修改的内容，然后再上传本地修改后的文件

5、应用设置

    新增文件自动上传、下载

6、文件删除

    更新MD5文件，删除远程文件