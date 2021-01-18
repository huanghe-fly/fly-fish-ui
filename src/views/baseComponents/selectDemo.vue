<!--
@author huangHe
-->
<template>
    <div>
        <fly-select placeholder="请选择" width="200" :options="options" v-model="flySelectValue"></fly-select>
    </div>
</template>

<script>
    import FlySelect from '@/packages/base/fly-select/fly-select'
    export default {
        name: 'selectDemo',
        props: {},
        components: {FlySelect},
        data() {
            return {
                options: [
                    {label: '1', value: 1},
                    {label: '2', value: 2},
                    {label: '3', value: 3},
                ],
                flySelectValue: 2
            };
        },
        created() {
        },
        methods: {
            getMySelect() {
                console.log('我选择的是：', this.flySelectValue);
                return this.flySelectValue;
            }
        },
        mounted() {
        },
        watch: {}
    };
</script>

<style scoped></style>
