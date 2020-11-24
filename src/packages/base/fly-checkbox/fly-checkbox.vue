<!--
@author huangHe
-->
<template>
    <span class="fly-checkbox-wrapper">
        <span class="fly-checkbox" :class="value === true || value === '1' ? 'is-checked' : ''" @click="change"></span>
        <span class="fly-checkbox-label" @click="change">{{label}}</span>
    </span>
</template>

<script>
    export default {
        name: 'fly-checkbox',
        props: {
            value: {
                type: [Boolean, String],
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
                if (this.value === true || this.value === '1') {
                    this.$emit('change', this.value === true ? false : '0');
                } else {
                    this.$emit('change', this.value === false ? true : '1');
                }
                this.$emit('click');
            }
        },
        mounted() {
        },
        watch: {}
    };
</script>

<style scoped></style>
