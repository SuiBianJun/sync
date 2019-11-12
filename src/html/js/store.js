import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 初始化状态
        currentSyncDirPath: ''
    },
    mutations: {
        // 处理状态
        setCurrentSyncDirPath(state, path){
            state.currentSyncDirPath = path;
        }
    },
});

export default store