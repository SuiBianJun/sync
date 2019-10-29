import Vue from '../node_modules/vue/dist/vue'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

// 自定义组件
import login from '../httpserver/html/component/login.vue'
 
Vue.use(VueAxios, axios)
Vue.use(ViewUI);

var vm = new Vue({
    el: "#login",
    components: {
        login
    }
});