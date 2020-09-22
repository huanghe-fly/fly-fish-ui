<!--
@author huangHe
-->
<template>
    <div class="layout">
        <div class="header">Header</div>
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
                    icon: '',
                    children: [
                        {name: '输入框', path: ''},
                        {name: '选择框', path: ''},
                        {name: '按钮', path: ''},
                        {name: '表格', path: ''},
                        {name: '分页', path: ''},
                        {name: '日期选择', path: ''}
                    ]
                },
                {
                    name: '拓展组件',
                    icon: '',
                    children: [
                        {name: '表单', path: ''},
                        {name: '列表', path: ''},
                        {name: '详情', path: ''}
                    ]
                }
            ]
        },
        watch: {}
    };
</script>

<style scoped></style>
