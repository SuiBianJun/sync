<template>

    <Button type="primary" class="tooltip" shape="circle" @click="showTooltip()">注册
        <div class="tooltiptext" v-bind:style="{visibility: vs}">
                <a href="http://www.baidu.com" target="_blank">百度</a>
                <a href="http://www.baidu.com" target="_blank">谷歌</a>
        </div>
    </Button>

    <!-- <button class="tooltip" @click.prevent="showTooltip()">注册
        <div class="tooltiptext" v-bind:style="{visibility: vs}">
                <a href="http://www.baidu.com" target="_blank">百度</a>
                <a href="http://www.baidu.com" target="_blank">谷歌</a>
        </div>
    </button> -->
</template>

<script>
export default {
    data(){
        return {
            vs: 'hidden'
        };
    },
    methods: {
        showTooltip(){
            if(this.vs == 'hidden'){
                this.vs = 'visible';
            }else{
                this.vs = 'hidden';
            }
        }
    },
}
</script>