<template>
    <Layout>
        <Content>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="syncdir" theme="light" width="auto" @on-select="leftNaviSelect">
                        <MenuItem name="syncdir">
                            <Icon type="ios-paper" />
                            我的同步文件夹
                        </MenuItem>
                        <MenuItem name="bucket">
                            <Icon type="ios-paper" />
                            Bucket管理
                        </MenuItem>
                    </Menu>
                </Sider>
                <Content :style="{padding: '24px', minHeight: '540px', background: '#fff'}">
                    <router-view name="rightContent"></router-view>
                </Content>
            </Layout>
        </Content>
        <!-- <Layout :style="{padding: '14px 24px 24px'}">
        </Layout> -->
        <!-- <Footer class="layout-footer-center">power by suibianjun</Footer> -->
    </Layout>
</template>
<script>
// ????
import axiosToken from '../js/axiosToken.js'
import router from '../js/router'

    export default {
        data: function(){
            return {

            };
        },
        router,
        methods: {
            leftNaviSelect(name){
                switch(name){
                    case 'syncdir': {
                        router.push({path: '/menuClient/syncdirinfo'});
                    }break;
                    case 'bucket': {
                        router.push({path: '/menuClient/bucketinfo'});
                    }break;
                }
            }
        },
    }
</script>