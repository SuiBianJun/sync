

import $ from "jquery"

import Vue from '../node_modules/vue/dist/vue'

import '../httpserver/static/css/sync.css'

import ViewUI from 'view-design';

import 'view-design/dist/styles/iview.css';

import inavi from '../httpserver/html/component/inavi.vue'

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