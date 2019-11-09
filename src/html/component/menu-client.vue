<template>
<div id="content">
    <div id="menu-content">
        <Menu active-name="1">
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
    </div>

    <div id="right-content">
        <router-view name="rightContent"></router-view>
    </div>
</div>
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