/* 登录页面 */
<template>
    <div id="panel">
        <div id="center">
            <div>
                <Select v-model="region" filterable>
                    <Option v-for="item in regionList" :value="item" :key="item">{{ item }}</Option>
                </Select>
            </div>
            <div class='acckeyid'>
                <Input v-model="accessKeyId" placeholder="Your accessKeyId" style="width: 300px;" />
            </div>
            <div class='acckeysec'>
                <Input v-model="accessKeySecret" placeholder="Your accessKeySecret" style="width: 300px;" />
            </div>
            <div class="login-register">
                <Button type="primary" shape="circle" @click="login()">登录</Button>
                <Button type="primary" shape="circle" @click="register()">注册</Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return{
            region: '',
            accessKeyId: '',
            accessKeySecret: '',
            regionList: ['oss-cn-shenzhen']
        };
    },
    methods: {
        register(){
            console.log('do register');
            // oss账户注册
            window.open('https://www.aliyun.com/product/oss/?lang=en');
        },
        login(){
            console.log('region: ' + this.region + ' accessKeySecret: ' + this.accessKeySecret + ", accessKeySecret: " + this.accessKeySecret);
            this.axios.post('/user/login', {
                username: this.username,
                password: this.password
            })
            .then(function (response) {
                console.log(response);
                window.location.assign("/static/html/home/home.html");
            })
            .catch((err) => {
                console.log("连接错误");
                this.error("登录提示", "网络连接错误");
            });
        },
        error: function(title, msg){
            this.$Notice.open({
                title: title,
                desc: msg
            });
        }
    },
}
</script>