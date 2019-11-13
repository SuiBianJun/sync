import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'

import menuClient from '../component/menu-client.vue'
import menuServer from '../component/menu-server.vue'
import menuSetting from '../component/menu-setting.vue'
import syncDirInfo from '../component/my-sync-dir-info.vue'
import syncDir from '../component/my-sync-dir.vue'
import bucketInfo from '../component/my-bucket-info.vue'

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
                    name: 'menuclientcsyncdirinfo',
                    path: 'syncdirinfo',
                    components: {
                        rightContent: syncDirInfo
                    }
                },
                {
                    name: 'menuclientcontentsyncdir',
                    path: 'contentsyncdir',
                    components: {
                        rightContent: syncDir
                    }
                },
                {
                    name: 'menuclientbucketinfo',
                    path: 'bucketinfo',
                    components: {
                        rightContent: bucketInfo
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