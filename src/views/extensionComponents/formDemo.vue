<!--
@author huangHe
-->
<template>
    <div>
        表单
        <div style="width: 800px">
            <fly-form :formItems="formItems"></fly-form>
        </div>
    </div>
</template>

<script>
    import FlyForm from '@/packages/extension/fly-form/fly-form'
    export default {
        name: 'formDemo',
        props: {},
        components: {FlyForm},
        data() {
            return {
                formItems: [],
                formData: {}
            };
        },
        created() {
        },
        methods: {},
        mounted() {
            this.formItems = [
                {label: '年龄', type: 'text', must: '1'},
                {label: '出生年月', type: 'text', must: '1'},
                {label: '学历', type: 'text', must: '1'},
                {label: '家庭住址', type: 'text', must: '1'},
                {label: '手机号', type: 'text', must: '1'},
                {label: '年龄', type: 'text', must: '1'},
                {label: '年龄', type: 'text', must: '1'},
                {label: '年龄', type: 'text', must: '1'},

            ]
        },
        watch: {}
    };
</script>

<style scoped></style>
