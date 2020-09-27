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
        <fly-input v-model="testInput" width="200" search/>
    </div>
</template>

<script>
    import FlyInput from '@/packages/base/fly-input/fly-input'
    export default {
        name: 'inputDemo',
        props: {},
        components: {FlyInput},
        data() {
            return {
                testInput: ''
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
