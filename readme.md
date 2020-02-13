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


7、网页中文件操作图标显示

    对于文件夹，如果该文件夹为新增文件夹，则显示【上传】图标，否则不显示任何图标，只能单项操作文件夹中的文件

8、网页中文件选择项勾选框

    用于批量操作

        对于文件夹，如果该文件夹为新增文件夹，则可勾选，否则不可勾选
        对于文件，只有上传，更新可勾选，其余无勾选框???

9、客户端与远程同步

    客户端只能查看客户端当前同步文件夹的状态，包括文件的新增与修改，不能查看远程服务器上的文件新增修改情况
    提供远程同步到本地的按钮操作，如果存在冲突【只能远程直接覆盖本地，提示备份冲突文件】

10、关于MD5文件的比对

    MD5文件格式：
    var dirData = {
        path: '/var/syncDir/', // 根目录
        md5s:[// 目录下所有的文件MD5值
            {
                type: 1,
                path: 'a',
                md5: ''
            }
        ]
    }

    首先与远程的（或本地的 ）MD5文件进行比对
        如果是新增的：当前MD5文件中不会记录
        如果是修改后的：在将文件目录变换为json格式时，在匹配到的路径加上修改标志即可
        如果删除的：加上删除标志，点击删除即可同步删除远程文件


11、文件删除操作

    网页上没有对本地文件系统的增删改操作，所有的增删改都来自用户实际对同步目录下的文件的增删改
    网页上的操作只是将文件系统的修改同步到远程服务器上，只做同步的工作


12、同一用户多个同步文件夹

    需要多个MD5文件对应不同的同步文件夹,并且一个路径只能添加一次


13、同步文件夹与Bucket的添加与删除

    删除同步文件夹不会删除本地文件夹，只有应逻辑对应关系
    添加的Bucket是oss中已经存在的，也是逻辑对应关系。考虑直接在应用中直接添加oss端的bucket

    删除同步文件夹，对用bucket关联的同步文件夹置空
    删除bucket, 对应的同步文件夹关联的bucket置空


15、如果未进行bucket关联，任何文件夹的修改都是不变的，该文件夹为未同步状态

16、返回给前端的目录json结构
{
    type: "",
    name: "",
    sync_state: "",// 当前文件的同步状态 upload 未上传，download 未下载，sync 等待同步到远程服务器，done 同步完成，conflict 冲突文件
    path: "",// 文件全路径
    dirs: []
}

17、文件夹状态管理

文件夹关联bucket：
    1、关联开始生成文件夹md5文件，只有页面操作后才修改文件内容。在此期间对文件夹的操作都与第一次生成的md5文件进行对比，获取文件的同步状态

bucket关联文件夹：
    1、文件夹必须为空
    2、一个bucket只能关联一个文件夹


18、几个重要的操作
    1、第一次上传文件夹到oss
    2、同步oss上的文件

