import Vue from 'vue/dist/vue.js'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);

let AUTH_TOKEN=(function(){
    return localStorage.getItem("accesstoken");
})();
 
var instance = axios.create({
});

instance.defaults.headers.common["AccessToken"] = AUTH_TOKEN;

instance.interceptors.request.use(function(config){
    config.headers.AccessToken = localStorage.getItem("accesstoken");
    console.log("add request token");
    return config;
},function(err){
    return Promise.reject(err);
});

instance.interceptors.response.use(function(res){
    if(res.headers.accesstoken){
        localStorage.setItem('accesstoken',res.headers.accesstoken);
    }
    return res;
},function(err){
    return err;
});
export default instance;