<template>
<div>
    <Menu mode="horizontal" :theme="theme1" active-name="client" @on-select="naviSelect">
        <MenuItem name="client">
            <Icon type="ios-paper" />
            客户端管理
        </MenuItem>
        <MenuItem name="server">
            <Icon type="ios-people" />
            服务器管理
        </MenuItem>
        <MenuItem name="setting">
            <Icon type="ios-construct" />
            综合设置
        </MenuItem>
    </Menu>
</div>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'light'
            }
        },
        methods: {
            naviSelect(name){
                console.log("navi select: " + name);
                // 父组件函数调用
                this.$parent.contentmenuchange(name);
            }
        },
    }
</script>