

import Vue from 'vue/dist/vue.js'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

import '../../static/css/sync.css'
import inavi from '../component/home.vue'
import notify from '../js/notification'
import router from '../js/router'
import menuClient from '../component/menu-client.vue'

// 引入iview的组件
Vue.use(ViewUI);

var vm = new Vue({

    el: "#page",
    data: {
        msg: 'vue',
        menuName: 'menuClient'
    },
    methods: {
        contentmenuchange(menuname){
            switch(menuname){
                case 'client': {
                    router.push({path: '/menuclient/content'});
                }break;
                case 'server': {
                    router.push({path: '/menuserver'});
                }break;
                case 'setting': {
                    router.push({path: '/menusetting'});
                }
            }
        },
        error(title, msg){
            notify.requestError(this, title, msg);
        },
        changeRouter(r){
            router.push(r);
        }
    },
    components: {
        inavi,
        menuClient
    },
    router,
    mounted() {// 实例挂载完成
        // 请求页面数据        
    },
});

router.push({path: '/menuClient/content'});
