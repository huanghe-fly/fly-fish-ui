import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: function () {
            return import('../views/Home.vue')
        }
    },
    {
        path: '/base',
        name: 'Base',
        component: function () {
            return import('../views/base-component')
        }
    }
];

const router = new VueRouter({
    routes
});

export default router
