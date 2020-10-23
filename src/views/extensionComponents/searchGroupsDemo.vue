<!--
@author huangHe
-->
<template>
    <div>
        查询框
        <div class="">
            <fly-search-groups :searchItems="searchItems" :defaultData="defaultData"></fly-search-groups>
        </div>
    </div>
</template>

<script>
    import FlySearchGroups from '@/packages/extension/fly-search-groups/fly-search-groups'
    export default {
        name: 'searchGroupsDemo',
        props: {},
        components: {FlySearchGroups},
        data() {
            return {
                searchItems: [],
                defaultData: {
                    age: '18'
                }
            };
        },
        created() {
        },
        methods: {},
        mounted() {
            this.searchItems = [
                {label: '年龄', dataIndex: 'age', type: 'text'},
                {label: '出生年月', dataIndex: 'birthday', type: 'text'},
                {label: '学历', dataIndex: 'education', type: 'text'},
                {label: '家庭住址', dataIndex: 'address', type: 'text'},
                {label: '手机号', dataIndex: 'phone', type: 'text'},
                {label: '年龄', dataIndex: 'age2', type: 'text'},
                {label: '年龄', dataIndex: 'age3', type: 'text'},
                {label: '年龄', dataIndex: 'age4', type: 'text'}
            ]
        },
        watch: {}
    };
</script>

<style scoped></style>
