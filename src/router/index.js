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
    },
    {
        path: '/input',
        name: 'Input',
        component: function () {
            return import('../views/baseComponents/inputDemo')
        }
    },
    {
        path: '/button',
        name: 'Button',
        component: function () {
            return import('../views/baseComponents/buttonDemo')
        }
    },
    {
        path: '/pagination',
        name: 'Pagination',
        component: function () {
            return import('../views/baseComponents/paginationDemo')
        }
    },
    {
        path: '/picker',
        name: 'Picker',
        component: function () {
            return import('../views/baseComponents/pickerDemo')
        }
    },
    {
        path: '/select',
        name: 'Select',
        component: function () {
            return import('../views/baseComponents/selectDemo')
        }
    },
    {
        path: '/table',
        name: 'Table',
        component: function () {
            return import('../views/baseComponents/tableDemo')
        }
    },
    {
        path: '/dialog',
        name: 'Dialog',
        component: function () {
            return import('../views/baseComponents/dialogDemo')
        }
    },
    {
        path: '/form',
        name: 'Form',
        component: function () {
            return import('../views/extensionComponents/formDemo')
        }
    },
    {
        path: '/searchGroups',
        name: 'SearchGroups',
        component: function () {
            return import('../views/extensionComponents/searchGroupsDemo')
        }
    },
    {
        path: '/tableList',
        name: 'TableList',
        component: function () {
            return import('../views/extensionComponents/tableListDemo')
        }
    },
    {
        path: '/billDetail',
        name: 'BillDetail',
        component: function () {
            return import('../views/extensionComponents/billDetailDemo')
        }
    }
];

const router = new VueRouter({
    routes
});

export default router
