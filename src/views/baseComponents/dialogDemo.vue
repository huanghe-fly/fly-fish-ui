<!--
@author huangHe
-->
<template>
    <div>
        <span @click="openClick">打开</span>
        <fly-dialog v-model="settingDialogVisible" :title="'头部'">
            <template>
                弹框内容
            </template>
            <!--<template slot="footer">
                <button class="fly-button fly-button-default">关闭</button>
            </template>-->
        </fly-dialog>
    </div>
</template>

<script>
    import FlyDialog from '@/packages/base/fly-dialog/fly-dialog'
    export default {
        name: 'dialogDemo',
        props: {},
        components: {FlyDialog},
        data() {
            return {
                settingDialogVisible: false
            };
        },
        created() {
        },
        methods: {
            openClick() {
                this.settingDialogVisible = true;
            }
        },
        mounted() {

        },
        watch: {}
    };
</script>

<style scoped></style>
