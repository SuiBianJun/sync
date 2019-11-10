<template>
    <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
            <Menu active-name="1" theme="light" width="auto">
                <MenuItem name="1">
                <Icon type="ios-paper" />
                我的同步文件夹
            </MenuItem>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-analytics" />
                    Bucket管理
                </template>
                    <MenuItem name="2-1">Option 1</MenuItem>
                    <MenuItem name="2-2">Option 2</MenuItem>
            </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{padding: '14px 24px 24px'}">
            <Content :style="{padding: '24px', minHeight: '540px', background: '#fff'}">
                <router-view name="rightContent"></router-view>
            </Content>
        </Layout>
    </Layout>
</template>
<script>
// ????
import axiosToken from '../js/axiosToken.js'

    export default {
        data: function(){
            return {

            };
        },
    }
</script>