<!--
@author huangHe
-->
<template>
    <div class="layout">
        <div class="header">Header</div>
        <div class="container">
            <div class="aside">
                <ul class="menu">
                    <li>
                        <span>基础组件</span>
                    </li>
                </ul>
            </div>
            <div class="content">
                <div class="main"><router-view /></div>
                <div class="footer">Footer</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Layout',
        props: {},
        components: {},
        data() {
            return {};
        },
        created() {
        },
        methods: {},
        mounted() {
        },
        watch: {}
    };
</script>

<style scoped></style>
