import Vue from 'vue/dist/vue.js'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

import '../../static/css/sync.css'

import dirtree from '../component/dir-tree.vue'

Vue.use(ViewUI);

var vm = new Vue({
    el: '#app',
    data: {

    },
    methods: {
        
    },
    components: {
        dirtree
    }
});