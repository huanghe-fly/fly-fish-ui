<!--
@author huangHe
-->
<template>
    <div>
        <div style="width: 200px">
            <fly-input v-model="testInput"/>
        </div>
        <fly-input v-model="testInput" style="width: 200px"/>
        <fly-input v-model="testInput" width="200" placeholder="请输入"/>
        <fly-input v-model="testInput" width="200" search placeholder="请输入请输入请输入请输入请输入"/>
        <div>
            <fly-checkbox v-model="testCheckbox" label="勾选框"/>
        </div>
    </div>
</template>

<script>
    import FlyInput from '@/packages/base/fly-input/fly-input'
    import FlyCheckbox from '@/packages/base/fly-checkbox/fly-checkbox'
    export default {
        name: 'inputDemo',
        props: {},
        components: {FlyInput, FlyCheckbox},
        data() {
            return {
                testInput: '',
                testCheckbox: false
            };
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
