

import $ from "jquery"
import Vue from 'vue/dist/vue.js'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

import '../../static/css/sync.css'
import inavi from '../component/home.vue'

// 引入iview的组件
Vue.use(ViewUI);

var vm = new Vue({

    el: "#page",
    data: {
        msg: 'vue'
    },
    components: {
        inavi
    }

});