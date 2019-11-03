import Vue from 'vue/dist/vue.js'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

// 自定义组件
import login from '../component/login.vue'

import notify from '../js/notification'
 
Vue.use(VueAxios, axios);
Vue.use(ViewUI);

var vm = new Vue({
    el: "#login",
    components: {
        login
    },
    methods: {
        error(title, msg){
            notify.requestError(this, title, msg);
        }
    },
});