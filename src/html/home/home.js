

import Vue from 'vue/dist/vue.js'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import VueRouter from 'vue-router'

import '../../static/css/sync.css'
import inavi from '../component/home.vue'
import menuClient from '../component/menu-client.vue'
import menuServer from '../component/menu-server.vue'
import menuSetting from '../component/menu-setting.vue'

import notify from '../js/notification'

// 引入iview的组件
Vue.use(ViewUI);
Vue.use(VueRouter);

var router = new VueRouter({
    routes: [
        {
            path: '/',
            components: {
                menuLeft: menuClient
            }
        },
        {
            path: '/menuclient',
            components: {
                menuLeft: menuClient
            }
        },
        {
            path: '/menuserver',
            components: {
                menuLeft: menuServer
            }
        },
        {
            path: '/menusetting',
            components: {
                menuLeft: menuSetting
            }
        }
    ]
});

// router not allow
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

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
                    router.push({path: '/menuclient'});
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

router.push({path: '/menuClient'});
