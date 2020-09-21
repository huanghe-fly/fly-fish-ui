<!--
@author huangHe
-->
<template>
    <div class="fly-select" :style="{'width': width + 'px'}">
        <input :placeholder="placeholder" readonly="readonly"
               @focus="focus()" @blur="blur()" v-model="selectedOption.label"
                @click="click()"/>
        <i class="fly-select-icon fa fa-angle-down" :class="isShowOptions ? 'angle-up' : ''"
           tabindex="0" @focus="focus()" @blur="blur()"></i>
        <div v-if="isShowOptions" class="fly-options">
            <label class="fly-option" v-for="option in options" @click="clickOption(option)">{{option.label}}</label>
        </div>
    </div>
</template>

<script>
    export default {
        name: "fly-select",
        props: {
            width: [Number, String],
            placeholder: String,
            options: Array,
            selectedValue: {}
        },
        model: {
            prop: 'selectedValue',
            event: 'change'
        },
        data() {
            return {
                selectedOption: {},
                isShowOptions: false
            }
        },
        methods: {
            focus() {
                this.isShowOptions = true;
            },
            blur() {
                setTimeout(()=> {
                    this.isShowOptions = false;
                }, 200)
            },
            click() {
                // this.isShowOptions = !this.isShowOptions;
            },
            clickOption(option) {
                this.selectedOption = option;
                this.$emit('change', this.selectedOption.value)
            },
            setDefaultValue() {
                if(this.selectedValue) {
                    this.selectedOption = this.options.find((i)=>i.value === this.selectedValue)
                }
            }
        },
        mounted() {
            this.setDefaultValue();
        }
    }
</script>

<style scoped>

</style>
