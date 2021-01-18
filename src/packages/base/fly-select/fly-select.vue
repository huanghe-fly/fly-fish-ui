<!--
@author huangHe
-->
<template>
    <div class="fly-select" :style="{'width': width + 'px'}">
        <input :placeholder="placeholder" readonly="readonly"
               @blur="blur" v-model="selectedOption.label"
               @click="click"/>
        <i class="fly-input-icon iconfont icon-arrow-down" :class="isShowOptions ? 'angle-up' : 'angle-down'"
           @click="click"></i>
        <div class="fly-options">
            <label class="fly-option" v-for="option in options"
                   :class="option.value === selectedOption.value ? 'actionOption' : ''"
                   @click="clickOption(option)">{{option.label}}</label>
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
            value: [Number, String]
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        data() {
            return {
                selectedOption: {},
                isShowOptions: false
            }
        },
        methods: {
            blur() {
                setTimeout(()=> {
                    this.isShowOptions = false;
                }, 200)
            },
            click() {
                this.isShowOptions = !this.isShowOptions;
            },
            clickOption(option) {
                this.selectedOption = option;
                this.$emit('change', this.selectedOption.value);
                console.log(`子组件里打印getMySelect: ${this.getMySelect()}`);
                console.log(`子组件里打印selectValue: ${this.selectValue}`)
            },
            setDefaultValue() {
                if(this.value) {
                    this.selectedOption = this.options.find((i)=>i.value === this.value)
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
