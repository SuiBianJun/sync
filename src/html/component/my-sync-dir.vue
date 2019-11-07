<template>
    
    <div v-if="dataLength == 0">
        未配置同步文件夹
    </div>

</template>

<script>
export default {
    data: function(){
        return {
            data: {},
            dataLength: 0
        };
    },
    created() {
        this.init(this.$route.params.data);
        console.log('init');
    },
    methods: {
        init(d){
            this.data = d;
            console.log(this.data);
            this.dataLength = this.data.length;
        }
    },
}
</script>