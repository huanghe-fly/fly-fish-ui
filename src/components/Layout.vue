<!--
@author huangHe
-->
<template>
    <div class="layout">
        <div class="header">
            <div class="menu-bar"><i class="fa fa-navicon"></i></div>
            <div></div>
        </div>
        <div class="container">
            <div class="aside">
                <FlyMenu :menus="menus"/>
            </div>
            <div class="content">
                <div class="main"><router-view /></div>
                <div class="footer">Footer</div>
            </div>
        </div>
    </div>
</template>

<script>
    import FlyMenu from '@/packages/base/fly-menu/fly-menu'
    export default {
        name: 'Layout',
        props: {},
        components: {FlyMenu},
        data() {
            return {
                menus: []
            };
        },
        created() {
        },
        methods: {},
        mounted() {
            this.menus = [
                {
                    name: '基础组件',
                    icon: 'fa fa-gear',
                    children: [
                        {name: '输入框', path: '/input'},
                        {name: '选择框', path: '/select'},
                        {name: '按钮', path: '/button'},
                        {name: '基础表格', path: '/table'},
                        {name: '分页', path: '/pagination'},
                        {name: '日期选择', path: '/picker'},
                        {name: '弹框', path: '/dialog'},
                    ]
                },
                {
                    name: '拓展组件',
                    icon: 'fa fa-gear',
                    children: [
                        {name: '表单', path: '/form'},
                        {name: '查询', path: '/searchGroups'},
                        {name: '表格', path: '/listTable'},
                        {name: '列表页面', path: '/listModule'},
                        {name: '详情页面', path: '/billDetail'}
                    ]
                }
            ]
        },
        watch: {}
    };
</script>

<style scoped></style>
