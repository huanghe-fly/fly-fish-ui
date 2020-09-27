<!--
@author huangHe
-->
<template>
    <div>
        <fly-button label="按钮1"/>
        <fly-button label="按钮2" primary/>
        <fly-button label="按钮3" primary disabled/>
    </div>
</template>

<script>
    import FlyButton from '@/packages/base/fly-button/fly-button'
    export default {
        name: 'buttonDemo',
        props: {},
        components: {FlyButton},
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
