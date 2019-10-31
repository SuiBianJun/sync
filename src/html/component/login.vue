/* 登录页面 */
<template>
    <div id="panel">
        <div id="center">
            <div>
                <Input v-model="username" placeholder="用户名" style="width: 300px;" />
            </div>
            <div class='passwd'>
                <Input v-model="password" placeholder="密码" style="width: 300px;" />
            </div>
            <div class="login-register">
                <Button type="primary" shape="circle" @click="login()">登录</Button>
                <Button type="primary" shape="circle" @click="register()">注册</Button>
            </div>
        </div>
    </div>
</template>

<style scoped>

#panel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: gainsboro;
}
#center {
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    bottom: 0;
    top: 40%;
    width: 300px;
}
.passwd {
    margin-top: 7px;
}

.login-register {
    margin-top: 10px;
}
</style>

<script>
export default {
    data: function(){
        return{
            username: '',
            password: ''
        };
    },
    methods: {
        register(){
            console.log('do register');
            // oss账户注册
            window.open('https://www.aliyun.com/product/oss/?lang=en');
        },
        login(){
            console.log('username: ' + this.username + ", password: " + this.password);
            this.axios.post('/user/login', {
                username: this.username,
                password: this.password
            })
            .then(function (response) {
                console.log(response);
                window.location.assign("/static/home/home.html");
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
}
</script>