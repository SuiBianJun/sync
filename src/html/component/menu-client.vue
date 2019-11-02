<template>
    <Menu active-name="1">
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-analytics" />
                我的同步文件夹
            </template>
                <MenuItem name="1-1">Option 1</MenuItem>
                <MenuItem name="1-2">Option 2</MenuItem>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-analytics" />
                Bucket管理
            </template>
                <MenuItem name="2-1">Option 1</MenuItem>
                <MenuItem name="2-2">Option 2</MenuItem>
        </Submenu>
    </Menu>
</template>
<script>
    export default {
        data: function(){
            return {

            };
        },
        methods: {
            // 获取我的同步文件夹目录
            getAllSyncDir(){
                this.axios.post('/client/syncdir/list', {
                    accessId: "xx"
                })
                .then(function (response) {
                    console.log(response);
                    window.location.assign("/static/html/home/home.html");
                })
                .catch((err) => {
                    console.log("连接错误");
                    this.error("我的同步文件夹获取提示", "网络连接错误");
                });
            },
            error: function(title, msg){
                this.$Notice.open({
                    title: title,
                    desc: msg
                });
            }
        },
        mounted() {
            console.log("menu-client mounted");
            // 请求数据
            this.getAllSyncDir();
        },
    }
</script>