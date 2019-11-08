var config = {
    client: [
        {
            local_path: "",// 本地路径
            bucket_name: "",// 对应远程文件服务器的存储位置，一个bucket只能对应一个同步文件夹
            synced: "", // 该文件夹是否为同步文件夹 0 1
            md5_path: "",// 同步文件夹下所有文件的md5对应标识文件路径
        }
    ],
    server: {

    }
}

module.exports = config