import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'

import menuClient from '../component/menu-client.vue'
import menuServer from '../component/menu-server.vue'
import menuSetting from '../component/menu-setting.vue'
import syncDir from '../component/my-sync-dir.vue'

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
            },
            children: [
                {
                    name: 'menuclientcontent',
                    path: 'content',
                    components: {
                        rightContent: syncDir
                    }
                }
            ]
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
        },
    ]
});

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default router