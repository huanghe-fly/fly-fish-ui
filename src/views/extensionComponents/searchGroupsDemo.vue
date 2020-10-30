<!--
@author huangHe
-->
<template>
    <div>
        查询框
        <div class="">
            <fly-search-groups v-model="searchItems" :defaultData="defaultData"></fly-search-groups>
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
                {title: '年龄', dataIndex: 'age', type: 'text', checked: true},
                {title: '出生年月', dataIndex: 'birthday', type: 'text', checked: true},
                {title: '学历', dataIndex: 'education', type: 'text', checked: true},
                {title: '家庭住址', dataIndex: 'address', type: 'text', checked: true},
                {title: '手机号', dataIndex: 'phone', type: 'text', checked: false},
                {title: '年龄', dataIndex: 'age2', type: 'text', checked: false},
                {title: '年龄', dataIndex: 'age3', type: 'text', checked: false},
                {title: '年龄', dataIndex: 'age4', type: 'text', checked: false},
                {title: '年龄', dataIndex: 'age5', type: 'text', checked: false},
                {title: '年龄', dataIndex: 'age6', type: 'text', checked: false},
                {title: '年龄', dataIndex: 'age7', type: 'text', checked: false},
                {title: '年龄', dataIndex: 'age8', type: 'text', checked: false},
                {title: '年龄', dataIndex: 'age9', type: 'text', checked: false},
                {title: '年龄', dataIndex: 'age10', type: 'text', checked: false},
                {title: '年龄', dataIndex: 'age11', type: 'text', checked: false},
                {title: '年龄', dataIndex: 'age12', type: 'text', checked: false},
                {title: '年龄', dataIndex: 'age13', type: 'text', checked: false},
                {title: '年龄', dataIndex: 'age14', type: 'text', checked: false},
                {title: '年龄', dataIndex: 'age15', type: 'text', checked: false},
                {title: '年龄', dataIndex: 'age16', type: 'text', checked: false},
                {title: '年龄', dataIndex: 'age17', type: 'text', checked: false},
                {title: '年龄', dataIndex: 'age18', type: 'text', checked: false},
                {title: '年龄', dataIndex: 'age19', type: 'text', checked: false},
                {title: '年龄', dataIndex: 'age20', type: 'text', checked: false},
            ]
        },
        watch: {}
    };
</script>

<style scoped></style>
