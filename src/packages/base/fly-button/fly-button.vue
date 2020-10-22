<!--
@author huangHe
-->
<template>
    <button class="fly-button"
            :class="{'fly-button-default': !primary, 'fly-disabled': disabled, 'fly-button-primary': primary}"
            :disabled="disabled" @click="click($event)">
        {{label}}
    </button>
</template>

<script>
    export default {
        name: "fly-button",
        props: {
            label: String,
            primary: Boolean,
            disabled: Boolean
        },
        model: {},
        data() {
            return {}
        },
        methods: {
            click(e) {
                this.$emit('click', e)
            }
        },
        mounted() {
        }
    }
</script>
<style scoped>
</style>
