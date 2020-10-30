<!--
@author huangHe
-->
<template>
    <span class="fly-checkbox-wrapper">
        <span class="fly-checkbox" :class="value ? 'is-checked' : ''" @click="change"></span>
        <span class="fly-checkbox-label" @click="change">{{label}}</span>
    </span>
</template>

<script>
    export default {
        name: 'fly-checkbox',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            label: {
                type: String
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        components: {},
        data() {
            return {};
        },
        created() {
        },
        methods: {
            change() {
                this.$emit('change', !this.value);
                this.$emit('click');
            }
        },
        mounted() {
        },
        watch: {}
    };
</script>

<style scoped></style>
