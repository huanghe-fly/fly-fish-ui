<!--
@author huangHe
-->
<template>
    <div class="fly-menu">
        <ul>
            <template v-for="(menu, index) of menus">
                <li class="menu-item"
                    :class="activeIndex === index ? 'menuAction' : ''"
                    @click="getSubmenu(index, $event)"
                    @mousemove="menuItemMove"
                    @mouseleave="menuItemLeave">
                    <i class="icon fa" :class="menu.icon"></i>
                    <span>{{menu.name}}</span>
                </li>
            </template>
        </ul>
        <div class="submenu" v-if="showSubmenu"
             :style="submenuStyle"
             @mousemove="subMove"
             @mouseleave="subLeave">
            <h3 class="title">{{actionItem.name}}</h3>
            <div class="submenuMain">
                <template v-for="m of actionItem.children">
                    <span>{{m.name}}</span>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'fly-menu',
        props: {
            menus: {
                type: Array
            }
        },
        components: {},
        data() {
            return {
                activeIndex: 0, // 当前激活的菜单下标
                submenuStyle: {}, // 子级菜单样式
                mouseMoveMenuItem: false, // 是否移入菜单
                mouseMoveSubmenu: false, // 是否移入子菜单
                submenu: []
            };
        },
        computed: {
            // 当前激活的菜单
            actionItem: function () {
                return this.menus[this.activeIndex];
            },
            // 是否显示子菜单
            showSubmenu: function () {
                // return (this.mouseMoveMenuItem || this.mouseMoveSubmenu)
                return true
            }
        },
        created() {
        },
        methods: {
            // 点击菜单
            getSubmenu(index, event) {
                this.activeIndex = index;
                this.getSubmenuPosition(event);
            },
            // 获取子菜单位置
            getSubmenuPosition(event) {
                this.submenuStyle = {
                    top: `${event.currentTarget.offsetTop}px`,
                    left: `${event.currentTarget.offsetWidth + 5}px`,
                    display: 'block'
                };
            },
            // 鼠标移入一级菜单
            menuItemMove() {
                const vm = this;
                vm.mouseMoveMenuItem = true;
                /*setTimeout(() => {

                }, 100);*/
            },
            // 鼠标移出一级菜单
            menuItemLeave() {
                const vm = this;
                vm.mouseMoveMenuItem = false;
                if (!this.mouseMoveSubmenu) {
                    // this.submenuStyle['display'] = 'none';
                }
                /*setTimeout(() => {

                }, 100);*/
            },
            // 鼠标移入子级菜单
            subMove() {
                const vm = this;
                vm.mouseMoveSubmenu = true;
                /*setTimeout(() => {

                }, 100);*/
            },
            // 鼠标移出子级菜单
            subLeave() {
                const vm = this;
                vm.mouseMoveSubmenu = false;
                if (!this.mouseMoveMenuItem) {
                    // this.submenuStyle['display'] = 'none';
                }
                /*setTimeout(() => {

                }, 100);*/
            }
        },
        mounted() {
        },
        watch: {}
    };
</script>

<style scoped></style>
