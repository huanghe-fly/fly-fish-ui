<!--
@author huangHe
-->
<template>
    <div class="fly-input" :style="{'width': width + 'px'}">
        <input :class="search ? 'icon-input' : ''"
                :placeholder="placeholder"
               v-bind:value="value"
               @input="$emit('change', $event.target.value)"
               @focus="$emit('focus', $event.target.value)"
               @blur="$emit('blur', $event.target.value)"
               @change="$emit('change', $event.target.value)"/>
        <i v-if="search" class="fly-input-icon iconfont icon-search" @click="$emit('search', value)"></i>
    </div>
</template>

<script>
    export default {
        name: "fly-input",
        props: {
            width: [Number, String],
            placeholder: String,
            value: String,
            search: Boolean
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        data() {
            return {}
        },
        methods: {
        },
        mounted() {
        }
    }
</script>
<style scoped>
</style>
