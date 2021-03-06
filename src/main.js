import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'font-awesome/less/font-awesome.less'
import util from './util' // 工具方法
import './styles/base.less' // 基础样式
import './styles/layout.less' //布局样式
import './styles/fly-fish-ui.less' // fly-fish 所有样式

import './styles/icon/iconfont.css' // 引入阿里图标

Vue.config.productionTip = false;
Vue.prototype.util = util;
new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    }
}).$mount('#app');
